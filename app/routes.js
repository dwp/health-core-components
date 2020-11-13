const express = require('express')
const router = express.Router()
 
// statement Navigation
 
router.post("/wca_v1/TakingStatementsentry-post", function(req, res, next){
 
 if(req.body['comment'] === 'add-statement'){
 res.redirect('/wca_v1/condition_history_saved');
 } else {
 res.redirect('/wca_v1/TakingStatementsentry');
 }
 next();
});
 
// task list
 
router.get('/wca/task-list', function (req, res) {
 res.render('corecomponents/Research/3Navigation/WCA-tasklist/TaskList.html', { session: req.session.data })
})
 
router.get('/wca/condition-history', function (req, res) {
 res.render('corecomponents/Research/3Navigation/WCA-tasklist/Conditionhistory.html', { session: req.session.data });
});
 
router.post('/wca/condition-history/save-and-continue', function (req, res) {
 if (req.body['condition-history']) {
 req.session.data['condition-history'] = req.body['condition-history']
 }
 res.redirect('/wca/task-list');
});
 

router.get('/wca/social-work', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/SocialWorkHistory.html', { session: req.session.data });
   });
    
   router.post('/wca/social-work/save-and-continue', function (req, res) {
    if (req.body['social-work']) {
    req.session.data['social-work'] = req.body['social-work']
    }
    res.redirect('/wca/task-list');
   });
    

   router.get('/wca/typical-day', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/Typical_day.html', { session: req.session.data });
   });
    
   router.post('/wca/typical-day/save-and-continue', function (req, res) {
    if (req.body['typical-day']) {
    req.session.data['typical-day'] = req.body['typical-day']
    }
    res.redirect('/wca/task-list');
   });


   router.get('/wca/medication', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/Medication.html', { session: req.session.data });
   });
    
   router.post('/wca/medication/save-and-continue', function (req, res) {
    if (req.body['medication']) {
    req.session.data['medication'] = req.body['medication']
    }
    res.redirect('/wca/task-list');
   });


module.exports = router