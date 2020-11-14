const express = require('express')
const router = express.Router()
 
// statement Navigation
 
// router.post("/wca_v1/TakingStatementsentry-post", function(req, res, next){
 
//  if(req.body['comment'] === 'add-statement'){
//  res.redirect('/wca_v1/condition_history_saved');
//  } else {
//  res.redirect('/wca_v1/TakingStatementsentry');
//  }
//  next();
// });
 


router.post("/corecomponents/Research/3Navigation/WCA-tasklist/Typical_day-post", function(req, res, next){
 
    if(req.body['statement'] === 'statement2'){
    res.redirect('/corecomponents/Research/3Navigation/WCA-tasklist/TaskList');
    } else {
    res.redirect('/corecomponents/Research/3Navigation/WCA-tasklist/Typical_day');
    }
    next();
   });




// task list
 
router.get('/wca/task-list', function (req, res) {
 res.render('corecomponents/Research/3Navigation/WCA-tasklist/TaskList.html', { session: req.session.data })
})
 

router.get('/wca/attendee', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/additionalAttendee.html', { session: req.session.data });
   });
    
   router.post('/wca/attendee/save-and-continue', function (req, res) {
    if (req.body['attendee']) {
    req.session.data['attendee'] = req.body['attendee']
    }
    res.redirect('/wca/task-list');
   });


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
    

   router.get('/wca/statement', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/Typical_day.html', { session: req.session.data });
   });
    
   router.post('/wca/statement/save-and-continue', function (req, res) {
    if (req.body['statement']) {
    req.session.data['statement'] = req.body['statement']
    }
    res.redirect('/corecomponents/Research/3Navigation/WCA-tasklist/Typical_day');
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


   router.get('/wca/cardio', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/PA/breathlessness.html', { session: req.session.data });
   });
    
   router.post('/wca/cardio/save-and-continue', function (req, res) {
    if (req.body['cardio']) {
    req.session.data['cardio'] = req.body['cardio']
    }
    res.redirect('/wca/task-list');
   });


   router.get('/wca/general-health', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/PA/GeneralHealth.html', { session: req.session.data });
   });
    
   router.post('/wca/general-health/save-and-continue', function (req, res) {
    if (req.body['general-health']) {
    req.session.data['general-health'] = req.body['general-health']
    }
    res.redirect('/wca/task-list');
   });
   





// PIP Tasklist

   router.get('/pip/task-list', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/0-TaskList.html', { session: req.session.data })
   })
    
   router.get('/pip/evidence-considered', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/1-Consultation-start.html', { session: req.session.data });
   });
    
   router.post('/pip/evidence-considered/save-and-continue', function (req, res) {
    if (req.body['evidence-considered']) {
    req.session.data['evidence-considered'] = req.body['evidence-considered']
    }
    res.redirect('/pip/task-list');
   });



   router.get('/pip/add-attendee', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/1a-AddAttendee', { session: req.session.data });
   });
    
   router.post('/pip/add-attendee/save-and-continue', function (req, res) {
    if (req.body['add-attendee']) {
    req.session.data['add-attendee'] = req.body['add-attendee']
    }
    res.redirect('/pip/task-list');
   });


   router.get('/pip/history-condition', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/2-History-of-conditions', { session: req.session.data });
   });
    
   router.post('/pip/history-condition/save-and-continue', function (req, res) {
    if (req.body['history-condition']) {
    req.session.data['history-condition'] = req.body['history-condition']
    }
    res.redirect('/pip/task-list');
   });

  
   router.get('/pip/medication-name', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/3-Current-medication', { session: req.session.data });
   });
    
   router.post('/pip/medication-name/save-and-continue', function (req, res) {
    if (req.body['medication-name']) {
    req.session.data['medication-name'] = req.body['medication-name']
    }
    res.redirect('/pip/task-list');
   });



   router.get('/pip/social-history', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/4-Social-and-occ-history.html', { session: req.session.data });
   });
    
   router.post('/pip/social-history/save-and-continue', function (req, res) {
    if (req.body['social-history']) {
    req.session.data['social-history'] = req.body['social-history']
    }
    res.redirect('/pip/task-list');
   });


   router.get('/pip/variability', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/5-Functional-history.html', { session: req.session.data });
   });
    
   router.post('/pip/variability/save-and-continue', function (req, res) {
    if (req.body['pip/variability']) {
    req.session.data['pip/variability'] = req.body['pip/variability']
    }
    res.redirect('/pip/task-list');
   });

   router.get('/pip/observations', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/6-Observations.html', { session: req.session.data });
   });
    
   router.post('/pip/observations/save-and-continue', function (req, res) {
    if (req.body['pip/observations']) {
    req.session.data['pip/observations'] = req.body['pip/observations']
    }
    res.redirect('/pip/task-list');
   });
   

   router.get('/pip/mental-state', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/7-Mental-state.html', { session: req.session.data });
   });
    
   router.post('/pip/mental-state/save-and-continue', function (req, res) {
    if (req.body['pip/mental-state']) {
    req.session.data['pip/mental-state'] = req.body['pip/mental-state']
    }
    res.redirect('/pip/task-list');
   });


   router.get('/pip/musculoskeletal', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/8-Musculoskeletal', { session: req.session.data });
   });
    
   router.post('/pip/musculoskeletal/save-and-continue', function (req, res) {
    if (req.body['pip/musculoskeletal']) {
    req.session.data['pip/musculoskeletal'] = req.body['pip/musculoskeletal']
    }
    res.redirect('/pip/task-list');
   });


   router.get('/pip/other-systems', function (req, res) {
    res.render('corecomponents/Research/3Navigation/pip-tasklist/9-Other-systems', { session: req.session.data });
   });
    
   router.post('/pip/other-systems/save-and-continue', function (req, res) {
    if (req.body['pip/other-systems']) {
    req.session.data['pip/other-systems'] = req.body['pip/other-systems']
    }
    res.redirect('/pip/task-list');
   });

module.exports = router