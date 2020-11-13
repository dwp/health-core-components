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
 
module.exports = router