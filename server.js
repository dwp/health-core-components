// Core dependencies
const fs = require('fs')
const path = require('path')

// NPM dependencies
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const nunjucks = require('nunjucks')
const sessionInCookie = require('client-sessions')
const sessionInMemory = require('express-session')
const cookieParser = require('cookie-parser')

// Run before other code to make sure variables from .env are available
dotenv.config()

// Local dependencies
const middleware = [
  require('./lib/middleware/authentication/authentication.js'),
  require('./lib/middleware/extensions/extensions.js')
]
const config = require('./app/config.js')
const documentationRoutes = require('./docs/documentation_routes.js')
const packageJson = require('./package.json')
const routes = require('./app/routes.js')
const utils = require('./lib/utils.js')
const extensions = require('./lib/extensions/extensions.js')

// Variables for v6 backwards compatibility
// Set false by default, then turn on if we find /app/v6/routes.js
var useV6 = false
var v6App
var v6Routes

if (fs.existsSync('./app/v6/routes.js')) {
  v6Routes = require('./app/v6/routes.js')
  useV6 = true
}

const app = express()
const documentationApp = express()

if (useV6) {
  console.log('/app/v6/routes.js detected - using v6 compatibility mode')
  v6App = express()
}

// Set cookies for use in cookie banner.
app.use(cookieParser())
documentationApp.use(cookieParser())
app.use(utils.handleCookies(app))
documentationApp.use(utils.handleCookies(documentationApp))

// Set up configuration variables
var releaseVersion = packageJson.version
var glitchEnv = (process.env.PROJECT_REMIX_CHAIN) ? 'production' : false // glitch.com
var env = (process.env.NODE_ENV || glitchEnv || 'development').toLowerCase()
var useAutoStoreData = process.env.USE_AUTO_STORE_DATA || config.useAutoStoreData
var useCookieSessionStore = process.env.USE_COOKIE_SESSION_STORE || config.useCookieSessionStore
var useHttps = process.env.USE_HTTPS || config.useHttps

useHttps = useHttps.toLowerCase()

var useDocumentation = (config.useDocumentation === 'true')

// Promo mode redirects the root to /docs - so our landing page is docs when published on heroku
var promoMode = process.env.PROMO_MODE || 'false'
promoMode = promoMode.toLowerCase()

// Disable promo mode if docs aren't enabled
if (!useDocumentation) promoMode = 'false'

// Force HTTPS on production. Do this before using basicAuth to avoid
// asking for username/password twice (for `http`, then `https`).
var isSecure = (env === 'production' && useHttps === 'true')
if (isSecure) {
  app.use(utils.forceHttps)
  app.set('trust proxy', 1) // needed for secure cookies on heroku
}

middleware.forEach(func => app.use(func))

// Set up App
var appViews = extensions.getAppViews([
  path.join(__dirname, '/app/views/'),
  path.join(__dirname, '/lib/')
])

var nunjucksConfig = {
  autoescape: true,
  noCache: true,
  watch: false // We are now setting this to `false` (it's by default false anyway) as having it set to `true` for production was making the tests hang
}

if (env === 'development') {
  nunjucksConfig.watch = true
}

nunjucksConfig.express = app

var nunjucksAppEnv = nunjucks.configure(appViews, nunjucksConfig)

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Set views engine
app.set('view engine', 'html')

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))

// Serve govuk-frontend in from node_modules (so not to break pre-extenstions prototype kits)
app.use('/node_modules/govuk-frontend', express.static(path.join(__dirname, '/node_modules/govuk-frontend')))

// Set up documentation app
if (useDocumentation) {
  var documentationViews = [
    path.join(__dirname, '/node_modules/govuk-frontend/'),
    path.join(__dirname, '/node_modules/govuk-frontend/components'),
    path.join(__dirname, '/docs/views/'),
    path.join(__dirname, '/lib/')
  ]

  nunjucksConfig.express = documentationApp
  var nunjucksDocumentationEnv = nunjucks.configure(documentationViews, nunjucksConfig)
  // Nunjucks filters
  utils.addNunjucksFilters(nunjucksDocumentationEnv)

  // Set views engine
  documentationApp.set('view engine', 'html')
}

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Set up v6 app for backwards compatibility
if (useV6) {
  var v6Views = [
    path.join(__dirname, '/node_modules/govuk_template_jinja/views/layouts'),
    path.join(__dirname, '/app/v6/views/'),
    path.join(__dirname, '/lib/v6') // for old unbranded template
  ]
  nunjucksConfig.express = v6App
  var nunjucksV6Env = nunjucks.configure(v6Views, nunjucksConfig)

  // Nunjucks filters
  utils.addNunjucksFilters(nunjucksV6Env)

  // Set views engine
  v6App.set('view engine', 'html')

  // Backward compatibility with GOV.UK Elements
  app.use('/public/v6/', express.static(path.join(__dirname, '/node_modules/govuk_template_jinja/assets')))
  app.use('/public/v6/', express.static(path.join(__dirname, '/node_modules/govuk_frontend_toolkit')))
  app.use('/public/v6/javascripts/govuk/', express.static(path.join(__dirname, '/node_modules/govuk_frontend_toolkit/javascripts/govuk/')))
}

// Add variables that are available in all views
app.locals.asset_path = '/public/'
app.locals.useAutoStoreData = (useAutoStoreData === 'true')
app.locals.useCookieSessionStore = (useCookieSessionStore === 'true')
app.locals.cookieText = config.cookieText
app.locals.promoMode = promoMode
app.locals.releaseVersion = 'v' + releaseVersion
app.locals.serviceName = config.serviceName
// extensionConfig sets up variables used to add the scripts and stylesheets to each page.
app.locals.extensionConfig = extensions.getAppConfig()

// Session uses service name to avoid clashes with other prototypes
const sessionName = 'govuk-prototype-kit-' + (Buffer.from(config.serviceName, 'utf8')).toString('hex')
const sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4, // 4 hours
    secure: isSecure
  }
}

// Support session data in cookie or memory
if (useCookieSessionStore === 'true') {
  app.use(sessionInCookie(Object.assign(sessionOptions, {
    cookieName: sessionName,
    proxy: true,
    requestKey: 'session'
  })))
} else {
  app.use(sessionInMemory(Object.assign(sessionOptions, {
    name: sessionName,
    resave: false,
    saveUninitialized: false
  })))
}

// Automatically store all data users enter
if (useAutoStoreData === 'true') {
  app.use(utils.autoStoreData)
  utils.addCheckedFunction(nunjucksAppEnv)
  if (useDocumentation) {
    utils.addCheckedFunction(nunjucksDocumentationEnv)
  }
  if (useV6) {
    utils.addCheckedFunction(nunjucksV6Env)
  }
}

// Clear all data in session if you open /prototype-admin/clear-data
app.post('/prototype-admin/clear-data', function (req, res) {
  req.session.data = {}
  res.render('prototype-admin/clear-data-success')
})

// Redirect root to /docs when in promo mode.
if (promoMode === 'true') {
  console.log('Prototype Kit running in promo mode')

  app.locals.cookieText = 'GOV.UK uses cookies to make the site simpler. <a href="/docs/cookies">Find out more about cookies</a>'

  app.get('/', function (req, res) {
    res.redirect('/docs')
  })

  // Allow search engines to index the Prototype Kit promo site
  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nAllow: /')
  })
} else {
  // Prevent search indexing
  app.use(function (req, res, next) {
    // Setting headers stops pages being indexed even if indexed pages link to them.
    res.setHeader('X-Robots-Tag', 'noindex')
    next()
  })

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
}

// Load routes (found in app/routes.js)
if (typeof (routes) !== 'function') {
  console.log(routes.bind)
  console.log('Warning: the use of bind in routes is deprecated - please check the Prototype Kit documentation for writing routes.')
  routes.bind(app)
} else {
  app.use('/', routes)
}

if (useDocumentation) {
  // Clone app locals to documentation app locals
  // Use Object.assign to ensure app.locals is cloned to prevent additions from
  // updating the original app.locals
  documentationApp.locals = Object.assign({}, app.locals)
  documentationApp.locals.serviceName = 'Prototype Kit'

  // Create separate router for docs
  app.use('/docs', documentationApp)

  // Docs under the /docs namespace
  documentationApp.use('/', documentationRoutes)
}

if (useV6) {
  // Clone app locals to v6 app locals
  v6App.locals = Object.assign({}, app.locals)
  v6App.locals.asset_path = '/public/v6/'

  // Create separate router for v6
  app.use('/', v6App)

  // Docs under the /docs namespace
  v6App.use('/', v6Routes)
}

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// Auto render any view that exists



// Statements captured component library v1
app.post('/form_components/TakingStatementsentry-v1', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})


// Statements captured component library
app.post('/form_components/TakingStatementsentry-v2', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})

// Statements captured WCA journey
app.post('/wca_v1/TakingStatementsentry', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})


app.post('/corecomponents/Research/2Navigation/tasklist/Statementsentry_Social', function (req, res, next){
console.log('********')
console.log(req.body)
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})





// Statements captured WCA journey
app.post('/WCA_v1/TakingStatementsentry_saved', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})




// research prototype 3 wca typical-day
app.post('/corecomponents/Research/3Navigation/WCA-tasklist/Typical_day', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca typical-day
app.post('/wca/statement/save-and-continue', function (req, res, next){
res.redirect('/wca/task-list');
})



// research prototype 3 wca informal-observe
app.post('/corecomponents/Research/3Navigation/WCA-tasklist/informal-observation', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.observestatements !== 'object'){
    req.session.data.observestatements=[];
  }
  if (req.body.observestatement){
    req.session.data.observestatements.push(req.body.observestatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca informal-observe
app.post('/wca/observestatement/save-and-continue', function (req, res, next){
res.redirect('/wca/task-list');
})



// research prototype 3 wca social
app.post('/corecomponents/Research/3Navigation/WCA-tasklist/SocialWorkHistory', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.socialstatements !== 'object'){
    req.session.data.socialstatements=[];
  }
  if (req.body.socialstatement){
    req.session.data.socialstatements.push(req.body.socialstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca social
app.post('/wca/socialstatement/save-and-continue', function (req, res, next){
res.redirect('/wca/task-list');
})







// research prototype 4 wca typical-day
app.post('/corecomponents/Research/4Navigation/WCA-tasklist/Typical_day', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.statements !== 'object'){
    req.session.data.statements=[];
  }
  if (req.body.statement){
    req.session.data.statements.push(req.body.statement)
  }
  console.log(req.session)
  next()
})

// research prototype 4 wca typical-day
app.post('/wca/statement4/save-and-continue', function (req, res, next){
res.redirect('/wca/task-list4');
})



// research prototype 4 wca informal-observe
app.post('/corecomponents/Research/4Navigation/WCA-tasklist/informal-observation', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.observestatements !== 'object'){
    req.session.data.observestatements=[];
  }
  if (req.body.observestatement){
    req.session.data.observestatements.push(req.body.observestatement)
  }
  console.log(req.session)
  next()
})

// research prototype 4 wca informal-observe
app.post('/wca/observestatement4/save-and-continue', function (req, res, next){
res.redirect('/wca/task-list4');
})



// research prototype 4 wca social
app.post('/corecomponents/Research/4Navigation/WCA-tasklist/SocialWorkHistory', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.socialstatements !== 'object'){
    req.session.data.socialstatements=[];
  }
  if (req.body.socialstatement){
    req.session.data.socialstatements.push(req.body.socialstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 4 wca social
app.post('/wca/socialstatement4/save-and-continue', function (req, res, next){
res.redirect('/wca/task-list4');
})








// left nav statements

// research prototype 3 wca leftnav social
app.post('/corecomponents/Research/3Navigation/WCA-Leftnav/social', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.leftsocstatements !== 'object'){
    req.session.data.leftsocstatements=[];
  }
  if (req.body.leftsocstatement){
    req.session.data.leftsocstatements.push(req.body.leftsocstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca leftnav social
app.post('/wca/leftnav/leftsocstatement/save-and-continue', function (req, res, next){
res.redirect('/corecomponents/Research/3Navigation/WCA-Leftnav/typical-day');
})



// research prototype 3 wca leftnav typical day
app.post('/corecomponents/Research/3Navigation/WCA-Leftnav/typical-day', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.leftTypstatements !== 'object'){
    req.session.data.leftTypstatements=[];
  }
  if (req.body.leftTypstatement){
    req.session.data.leftTypstatements.push(req.body.leftTypstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca leftnav typical day
app.post('/wca/leftnav/leftTyptatement/save-and-continue', function (req, res, next){
res.redirect('/wca/leftnav/leftobvstatement');
})


// research prototype 3 wca leftnav informal observartions
app.post('/corecomponents/Research/3Navigation/WCA-Leftnav/informal-observation', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.leftobvstatements !== 'object'){
    req.session.data.leftobvstatements=[];
  }
  if (req.body.leftobvstatement){
    req.session.data.leftobvstatements.push(req.body.leftobvstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca leftnav informal observations
app.post('/wca/leftnav/leftobvstatement/save-and-continue', function (req, res, next){
res.redirect('/corecomponents/Research/3Navigation/WCA-Leftnav/paRequired');
})










// left nav statements - TASKLIST VERSION

// research prototype 3 wca leftnav social
app.post('/corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/social', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.taskleftsocstatements !== 'object'){
    req.session.data.taskleftsocstatements=[];
  }
  if (req.body.taskleftsocstatement){
    req.session.data.taskleftsocstatements.push(req.body.taskleftsocstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca leftnav social
app.post('/wca/leftnav/leftsocstatement-task/save-and-continue', function (req, res, next){
res.redirect('/corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/typical-day');
})



// research prototype 3 wca leftnav typical day
app.post('/corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/typical-day', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.taskleftTypstatements !== 'object'){
    req.session.data.taskleftTypstatements=[];
  }
  if (req.body.taskleftTypstatement){
    req.session.data.taskleftTypstatements.push(req.body.taskleftTypstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca leftnav typical day
app.post('/wca/leftnav/leftTyptatement-task/save-and-continue', function (req, res, next){
res.redirect('/wca/leftnav/leftobvstatement-task');
})


// research prototype 3 wca leftnav informal observartions
app.post('/corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/informal-observation', function (req, res, next){
  console.log(req.session)
  if (typeof req.session.data.taskleftobvstatements !== 'object'){
    req.session.data.taskleftobvstatements=[];
  }
  if (req.body.taskleftobvstatement){
    req.session.data.taskleftobvstatements.push(req.body.taskleftobvstatement)
  }
  console.log(req.session)
  next()
})

// research prototype 3 wca leftnav informal observations
app.post('/wca/leftnav/leftobvstatement-task/save-and-continue', function (req, res, next){
res.redirect('/corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/paRequired');
})







// App folder routes get priority
app.get(/^([^.]+)$/, function (req, res, next) {
  utils.matchRoutes(req, res, next)
})

if (useDocumentation) {
  // Documentation  routes
  documentationApp.get(/^([^.]+)$/, function (req, res, next) {
    if (!utils.matchMdRoutes(req, res)) {
      utils.matchRoutes(req, res, next)
    }
  })
}

if (useV6) {
  // App folder routes get priority
  v6App.get(/^([^.]+)$/, function (req, res, next) {
    utils.matchRoutes(req, res, next)
  })
}

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, function (req, res) {
  res.redirect('/' + req.params[0])
})

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error(`Page not found: ${req.path}`)
  err.status = 404
  next(err)
})

// Display error
app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(err.status || 500)
  res.send(err.message)
})

console.log('\nGOV.UK Prototype Kit v' + releaseVersion)
console.log('\nNOTICE: the kit is for building prototypes, do not use it for production services.')

module.exports = app
