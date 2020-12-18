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
 

// router.post("/corecomponents/Research/3Navigation/WCA-tasklist/Typical_day-post", function(req, res, next){
 
//     if(req.body['statement'] === 'statement2'){
//     res.redirect('/corecomponents/Research/3Navigation/WCA-tasklist/TaskList');
//     } else {
//     res.redirect('/corecomponents/Research/3Navigation/WCA-tasklist/Typical_day');
//     }
//     next();
//    });

// configure our routes


   // router.post("/WCA/physical-assessments/Cardiovascular-and-respiratory/cardiovascular/decision-post", function(req, res, next){
 
   //    if(req.body['cardio'] === 'cardio-radial'){
   //    res.redirect('radial-pulse');
   //    } if(req.body['cardio'] === 'cardio-left-leg'){
   //    res.redirect('LeftlegPerip');
   //    }
   //    next();
   //   });



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

router.get('/wca/condition-history-progress/save-and-continue', function (req, res) {
   req.session.data['condition-history-progress'] = {inProgress: true};
   res.redirect('/wca/task-list');
  });
 



router.get('/wca/medication', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-tasklist/medication.html', { session: req.session.data });
  });
   
  router.post('/wca/medication/save-and-continue', function (req, res) {
   if (req.body['medication']) {
   req.session.data['medication'] = req.body['medication']
   }
   res.redirect('/wca/task-list');
  });

router.get('/wca/medication-progress/save-and-continue', function (req, res) {
   req.session.data['condition-history-progress'] = {inProgress: true};
   res.redirect('/wca/task-list');
  });



router.get('/wca/socialstatement', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-tasklist/SocialWorkHistory.html', { session: req.session.data });
  });
   
  router.post('/wca/socialstatement/save-and-continue', function (req, res) {
   if (req.body['socialstatement']) {
   req.session.data['socialstatement'] = req.body['socialstatement']
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
    res.redirect('/wca/task-list');
   });



   router.get('/wca/observestatement', function (req, res) {
      res.render('corecomponents/Research/3Navigation/WCA-tasklist/informal-observation.html', { session: req.session.data });
     });
      
     router.post('/wca/observestatement/save-and-continue', function (req, res) {
      if (req.body['observestatement']) {
      req.session.data['observestatement'] = req.body['observestatement']
      }
      res.redirect('/wca/task-list');
     });




   router.get('/wca/cardio', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/physical-assessments/Cardiovascular-and-respiratory/cardiovascular.html', { session: req.session.data });
   });
    
   router.post('/wca/cardio/save-and-continue', function (req, res) {
    if (req.body['cardio']) {
    req.session.data['cardio'] = req.body['cardio']
    }
    res.redirect('/wca/task-list');
   });


   router.get('/wca/general-health', function (req, res) {
    res.render('corecomponents/Research/3Navigation/WCA-tasklist/physical-assessments/General-health/GeneralHealth.html', { session: req.session.data });
   });
    
   router.post('/wca/general-health/save-and-continue', function (req, res) {
    if (req.body['general-health']) {
    req.session.data['general-health'] = req.body['general-health']
    }
    res.redirect('/wca/task-list');
   });
   

   router.get('/wca/leg-back', function (req, res) {
      res.render('corecomponents/Research/3Navigation/WCA-tasklist/physical-assessments/Lower-back-and-legs/lowerbacklegs.html', { session: req.session.data });
     });
      
     router.post('/wca/leg-back/save-and-continue', function (req, res) {
      if (req.body['leg-back']) {
      req.session.data['leg-back'] = req.body['leg-back']
      }
      res.redirect('/wca/task-list');
     });
     


     router.get('/wca/neck-arms', function (req, res) {
      res.render('corecomponents/Research/3Navigation/WCA-tasklist/physical-assessments/Neck-and-arms/neckArms.html', { session: req.session.data });
     });
      
     router.post('/wca/neck-arms/save-and-continue', function (req, res) {
      if (req.body['neck-arms']) {
      req.session.data['neck-arms'] = req.body['neck-arms']
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


   router.get('/pip/medication-name-add', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-tasklist/3-Current-medication-addanother.html', { session: req.session.data });
     });
      
     router.post('/pip/medication-name-add/save-and-continue', function (req, res) {
      if (req.body['medication-name-add']) {
      req.session.data['medication-name-add'] = req.body['medication-name-add']
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






// left nav WCA
 

router.get('/wca/leftnav/wca-left-attendee', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/additionalAttendee.html', { 
      session: req.session.data,
      request: req
   });
  });
   
  router.post('/wca/leftnav/wca-left-attendee/save-and-continue', function (req, res) {
   if (req.body['wca-left-attendee']) {
   req.session.data['wca-left-attendee'] = req.body['wca-left-attendee']
   }
   res.redirect('/wca/leftnav/left-condition-history');
  });


  router.get('/wca/leftnav/left-condition-history', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/condition_history.html', { 
      session: req.session.data,
      request: req
   });
  });
   
  router.post('/wca/leftnav/left-condition-history/save-and-continue', function (req, res) {
   if (req.body['left-condition-history']) {
   req.session.data['left-condition-history'] = req.body['left-condition-history']
   }
   res.redirect('/wca/leftnav/left-medication');
  });
   


  router.get('/wca/leftnav/left-medication', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/medication.html', { 
   session: req.session.data,
   request: req
});
});

  router.post('/wca/leftnav/left-medication/save-and-continue', function (req, res) {
   if (req.body['left-medication']) {
   req.session.data['left-medication'] = req.body['left-medication']
   }
   res.redirect('/wca/leftnav/leftsocstatement');
  });



  router.get('/wca/leftnav/leftsocstatement', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/social.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/leftsocstatement/save-and-continue', function (req, res) {
   if (req.body['leftsocstatement']) {
   req.session.data['leftsocstatement'] = req.body['leftsocstatement']
   }
   res.redirect('/wca/leftnav/leftTypstatement');
  });



  router.get('/wca/leftnav/leftTypstatement', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/typical-day.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/leftTypstatement/save-and-continue', function (req, res) {
   if (req.body['leftTypstatement']) {
   req.session.data['leftTypstatement'] = req.body['leftTypstatement']
   }
   res.redirect('/wca/leftnav/pa-required');
  });



  router.get('/wca/leftnav/pa-required', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/paRequired.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/pa-required/save-and-continue', function (req, res) {
   if (req.body['pa-required']) {
   req.session.data['pa-required'] = req.body['pa-required']
   }
   res.redirect('/wca/leftnav/pa-consent');
  });

  
  router.get('/wca/leftnav/pa-consent', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/pa-consent.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/pa-consent/save-and-continue', function (req, res) {
   if (req.body['pa-consent']) {
   req.session.data['pa-consent'] = req.body['pa-consent']
   }
   res.redirect('/wca/leftnav/pa-checklist');
  });


  router.get('/wca/leftnav/pa-checklist', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/pa-checklist.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/pa-checklist/save-and-continue', function (req, res) {
   if (req.body['pa-checklist']) {
   req.session.data['pa-checklist'] = req.body['pa-checklist']
   }
   res.redirect('/wca/leftnav/left-lower-back-legs');
  });


  router.get('/wca/leftnav/mental-health', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/mental-health.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/wca/leftnav/mental-health/save-and-continue', function (req, res) {
   if (req.body['mental-health']) {
   req.session.data['mental-health'] = req.body['mental-health']
   }
   res.redirect('/wca/leftnav/leftobvstatement');
  });



  
  router.get('/wca/leftnav/leftobvstatement', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/informal-observations.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav//leftobvstatement/save-and-continue', function (req, res) {
   if (req.body['/leftobvstatement']) {
   req.session.data['/leftTypstatement'] = req.body['/leftobvstatement']
   }
   res.redirect('/wca/leftnav/PA');
  });

 
// left nav WCA -- PA



// router.get('/wca/leftnav/general-health', function (req, res) {
//    res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/General-health/GeneralHealth.html', { 
//       session: req.session.data,
//       request: req
//    });
//    });
  
//   router.post('/wca/leftnav/general-health/save-and-continue', function (req, res) {
//    if (req.body['general-health']) {
//    req.session.data['general-health'] = req.body['general-health']
//    }
//    res.redirect('/wca/leftnav/back-legs');
//   });


  router.get('/wca/leftnav/left-lower-back-legs', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Lower-back-and-legs/lowerbacklegs.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav/left-lower-back-legs/save-and-continue', function (req, res) {
   if (req.body['left-lower-back-legs']) {
   req.session.data['left-lower-back-legs'] = req.body['left-lower-back-legs']
   }
   res.redirect('/wca/leftnav/left-right-leg');
  });


  router.get('/wca/leftnav/left-right-leg', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Lower-back-and-legs/right-leg.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav/left-right-leg/save-and-continue', function (req, res) {
   if (req.body['left-right-leg']) {
   req.session.data['left-right-leg'] = req.body['left-right-leg']
   }
   res.redirect('/wca/leftnav/left-neck-arms');
  });


  router.get('/wca/leftnav/left-neck-arms', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Neck-and-arms/neckArms.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav/left-neck-arms/save-and-continue', function (req, res) {
   if (req.body['left-neck-arms']) {
   req.session.data['left-neck-arms'] = req.body['left-neck-arms']
   }
   res.redirect('/wca/leftnav/left-neck');
  });

  router.get('/wca/leftnav/left-neck', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Neck-and-arms/neck.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav/left-neck/save-and-continue', function (req, res) {
   if (req.body['left-neck']) {
   req.session.data['left-neck'] = req.body['left-neck']
   }
   res.redirect('/wca/leftnav/complete');
  });

  
  router.get('/wca/leftnav/complete', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Complete.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/complete/save-and-continue', function (req, res) {
   if (req.body['complete']) {
   req.session.data['complete'] = req.body['complete']
   }
   res.redirect('/wca/leftnav/mental-health');
  });


  router.get(' /wca/leftnav/add-pa', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/pa-checklist-saved.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post(' /wca/leftnav/add-pa/save-and-continue', function (req, res) {
   if (req.body['add-pa']) {
   req.session.data['add-pa'] = req.body['add-pa']
   }
   res.redirect('/wca/leftnav/cardiovascular');
  });


 




  router.get('/wca/leftnav/cardiovascular', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Cardiovascular-and-respiratory/cardiovascular.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav/cardiovascular/save-and-continue', function (req, res) {
   if (req.body['cardiovascular']) {
   req.session.data['cardiovascular'] = req.body['cardiovascular']
   }
   res.redirect('/wca/leftnav/cardiovascular');
  });


  router.get('/wca/leftnav/add-pa', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav/physical-assessments/Cardiovascular-and-respiratory/cardiovascular.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav/cardiovascular/save-and-continue', function (req, res) {
   if (req.body['cardiovascular']) {
   req.session.data['cardiovascular'] = req.body['cardiovascular']
   }
   res.redirect('/wca/leftnav/cardiovascular');
  });

  


  // left nav PIP
 
  router.get('/pip/leftnav/left-start', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/1-Consultation-start.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/left-start/save-and-continue', function (req, res) {
   if (req.body['left-start']) {
   req.session.data['left-start'] = req.body['left-start']
   }
   res.redirect('/pip/leftnav/pip-left-attendee');
  });



  router.get('/pip/leftnav/pip-left-attendee', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/1a-AddAttendee.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-attendee/save-and-continue', function (req, res) {
   if (req.body['pip-left-attendee']) {
   req.session.data['pip-left-attendee'] = req.body['pip-left-attendee']
   }
   res.redirect('/pip/leftnav/pip-left-condition');
  });



  router.get('/pip/leftnav/pip-left-condition', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/2-History-of-conditions.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-condition/save-and-continue', function (req, res) {
   if (req.body['pip-left-condition']) {
   req.session.data['pip-left-condition'] = req.body['pip-left-condition']
   }
   res.redirect('/pip/leftnav/pip-left-medication');
  });



  router.get('/pip/leftnav/pip-left-medication', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/3-Current-medication.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-medication/save-and-continue', function (req, res) {
   if (req.body['pip-left-medication']) {
   req.session.data['pip-left-medication'] = req.body['pip-left-medication']
   }
   res.redirect('/pip/leftnav/pip-left-social-history');
  });




  router.get('/pip/leftnav/pip-left-medication-add', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/3-Current-medication-add1.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-medication-add/save-and-continue', function (req, res) {
   if (req.body['pip-left-medication-add']) {
   req.session.data['pip-left-medication'] = req.body['pip-left-medication-add']
   }
   res.redirect('/pip/leftnav/pip-left-social-history');
  });


  router.get('/pip/leftnav/pip-left-social-history', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/4-Social-and-occ-history.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-social-history/save-and-continue', function (req, res) {
   if (req.body['pip-left-social-history']) {
   req.session.data['pip-left-social-history'] = req.body['pip-left-social-history']
   }
   res.redirect('/pip/leftnav/pip-left-variability');
  });



  router.get('/pip/leftnav/pip-left-variability', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/5-Functional-history.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-variability/save-and-continue', function (req, res) {
   if (req.body['pip-left-variability']) {
   req.session.data['pip-left-variability'] = req.body['pip-left-variability']
   }
   res.redirect('/pip/leftnav/pip-left-observations');
  });


  router.get('/pip/leftnav/pip-left-observations', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/6-Observations.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-observations/save-and-continue', function (req, res) {
   if (req.body['pip-left-observations']) {
   req.session.data['pip-left-observations'] = req.body['pip-left-observations']
   }
   res.redirect('/pip/leftnav/pip-mental-state');
  });



  router.get('/pip/leftnav/pip-mental-state', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/6a-Consent.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-mental-state/save-and-continue', function (req, res) {
   if (req.body['pip-mental-state']) {
   req.session.data['pip-mental-state'] = req.body['pip-mental-state']
   }
   res.redirect('/pip/leftnav/pip-left-musculoskeletal');
  });


  router.get('/pip/leftnav/pip-left-musculoskeletal', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/8-Musculoskeletal.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-musculoskeletal/save-and-continue', function (req, res) {
   if (req.body['pip-left-musculoskeletal']) {
   req.session.data['pip-left-musculoskeletal'] = req.body['pip-left-musculoskeletal']
   }
   res.redirect('/pip/leftnav/pip-left-other-systems');
  });



  router.get('/pip/leftnav/pip-left-other-systems', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/9-Other-systems.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-other-systems/save-and-continue', function (req, res) {
   if (req.body['pip-left-other-systems']) {
   req.session.data['pip-left-other-systems'] = req.body['pip-left-other-systems']
   }
   res.redirect('/pip/leftnav/pip-left-submit');
  });


  router.get('/pip/leftnav/pip-left-submit', function (req, res) {
   res.render('corecomponents/Research/3Navigation/pip-leftnav/10-Submit.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/pip/leftnav/pip-left-submit/save-and-continue', function (req, res) {
   if (req.body['pip-left-submit']) {
   req.session.data['pip-left-submit'] = req.body['pip-left-submit']
   }
   res.redirect('pip-left-submit');
  });




    // left nav PIP - non forced journey
 
    router.get('/pip/leftnav/left-start-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/1-Consultation-start.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/left-start-non/save-and-continue', function (req, res) {
      if (req.body['left-start-non']) {
      req.session.data['left-start-non'] = req.body['left-start-non']
      }
      res.redirect('/pip/leftnav/left-start-non');
     });
   
   
   
     router.get('/pip/leftnav/pip-left-attendee-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/1a-AddAttendee.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-attendee-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-attendee-non']) {
      req.session.data['pip-left-attendee-non'] = req.body['pip-left-attendee-non']
      }
      res.redirect('/pip/leftnav/pip-left-attendee-non');
     });
   
   
   
     router.get('/pip/leftnav/pip-left-condition-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/2-History-of-conditions.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-condition-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-condition-non']) {
      req.session.data['pip-left-condition-non'] = req.body['pip-left-condition-non']
      }
      res.redirect('/pip/leftnav/pip-left-condition-non');
     });
   
   
   
     router.get('/pip/leftnav/pip-left-medication-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/3-Current-medication.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-medication-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-medication-non']) {
      req.session.data['pip-left-medication-non'] = req.body['pip-left-medication-non']
      }
      res.redirect('/pip/leftnav/pip-left-medication-non');
     });
   
     router.get('/pip/leftnav/pip-left-medication-non-add', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/3-Current-medication-add.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-medication-non-add/save-and-continue', function (req, res) {
      if (req.body['pip-left-medication-non-add']) {
      req.session.data['pip-left-medication-non-add'] = req.body['pip-left-medication-non-add']
      }
      res.redirect('/pip/leftnav/pip-left-medication-non-add');
     });
   
     
   
   
     router.get('/pip/leftnav/pip-left-social-history-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/4-Social-and-occ-history.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-social-history-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-social-history-non']) {
      req.session.data['pip-left-social-history-non'] = req.body['pip-left-social-history-non']
      }
      res.redirect('/pip/leftnav/pip-left-social-history-non');
     });
   
   
   
     router.get('/pip/leftnav/pip-left-variability-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/5-Functional-history.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-variability-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-variability-non']) {
      req.session.data['pip-left-variability-non'] = req.body['pip-left-variability-non']
      }
      res.redirect('/pip/leftnav/pip-left-variability-non');
     });
   
   
     router.get('/pip/leftnav/pip-left-observations-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/6-Observations.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-observations-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-observations-non']) {
      req.session.data['pip-left-observations-non'] = req.body['pip-left-observations-non']
      }
      res.redirect('/pip/leftnav/pip-left-observations-non');
     });
   
   
     router.get('/pip/leftnav/pip-consent-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/6a-Consent.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-consent-non/save-and-continue', function (req, res) {
      if (req.body['pip-consent-non']) {
      req.session.data['pip-consent-non'] = req.body['pip-consent-non']
      }
      res.redirect('/pip/leftnav/pip-mental-state-non');
     });
   
   
   
     router.get('/pip/leftnav/pip-mental-state-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/7-Mental-state.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-mental-state-non/save-and-continue', function (req, res) {
      if (req.body['pip-mental-state-non']) {
      req.session.data['pip-mental-state-non'] = req.body['pip-mental-state-non']
      }
      res.redirect('/pip/leftnav/pip-mental-state-non');
     });
   
   
     router.get('/pip/leftnav/pip-left-musculoskeletal-non', function (req, res) {
      res.render('corecomponents/Research/3Navigation/pip-leftnav-non-forced/8-Musculoskeletal.html', { 
         session: req.session.data,
         request: req
      });
      });
      
     router.post('/pip/leftnav/pip-left-musculoskeletal-non/save-and-continue', function (req, res) {
      if (req.body['pip-left-musculoskeletal-non']) {
      req.session.data['pip-left-musculoskeletal-non'] = req.body['pip-left-musculoskeletal-non']
      }
      res.redirect('/pip/leftnav/pip-left-musculoskeletal-non');
     });
   
   










// left nav WCA - tasklist version
 

router.get('/wca/leftnav/wca-left-attendee-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/additionalAttendee.html', { 
      session: req.session.data,
      request: req
   });
  });
   
  router.post('/wca/leftnav/wca-left-attendee-task/save-and-continue', function (req, res) {
   if (req.body['wca-left-attendee-task']) {
   req.session.data['wca-left-attendee-task'] = req.body['wca-left-attendee-task']
   }
   res.redirect('/wca/leftnav/left-condition-history-task');
  });


  router.get('/wca/leftnav/left-condition-history-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/condition_history.html', { 
      session: req.session.data,
      request: req
   });
  });
   
  router.post('/wca/leftnav/left-condition-history-task/save-and-continue', function (req, res) {
   if (req.body['left-condition-history-task']) {
   req.session.data['left-condition-history-task'] = req.body['left-condition-history-task']
   }
   res.redirect('/wca/leftnav/left-medication-task');
  });
   


  router.get('/wca/leftnav/left-medication-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/medication.html', { 
   session: req.session.data,
   request: req
});
});

  router.post('/wca/leftnav/left-medication-task/save-and-continue', function (req, res) {
   if (req.body['left-medication-task']) {
   req.session.data['left-medication-task'] = req.body['left-medication-task']
   }
   res.redirect('/wca/leftnav/leftsocstatement-task');
  });



  router.get('/wca/leftnav/leftsocstatement-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/social.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/leftsocstatement-task/save-and-continue', function (req, res) {
   if (req.body['leftsocstatement-task']) {
   req.session.data['leftsocstatement-task'] = req.body['leftsocstatement-task']
   }
   res.redirect('/wca/leftnav/leftTypstatement-task');
  });



  router.get('/wca/leftnav/leftTypstatement-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/typical-day.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/leftTypstatement-task/save-and-continue', function (req, res) {
   if (req.body['leftTypstatement-task']) {
   req.session.data['leftTypstatement-task'] = req.body['leftTypstatement-task']
   }
   res.redirect('/wca/leftnav/pa-required-task');
  });



  router.get('/wca/leftnav/pa-required-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/paRequired.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/pa-required-task/save-and-continue', function (req, res) {
   if (req.body['pa-required-task']) {
   req.session.data['pa-required-task'] = req.body['pa-required-task']
   }
   res.redirect('/wca/leftnav/pa-consent-task');
  });

  
  router.get('/wca/leftnav/pa-consent-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/pa-consent.html', { 
      session: req.session.data,
      request: req
   });
   });

  router.post('/wca/leftnav/pa-consent-task/save-and-continue', function (req, res) {
   if (req.body['pa-consent-task']) {
   req.session.data['pa-consent-task'] = req.body['pa-consent-task']
   }
   res.redirect('/wca/left-tasklist');
  });


  router.get('/wca/leftnav/pa-tasklist', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/pa-tasklist.html', { 
      session: req.session.data,
      request: req
   });
   });

//   router.post('/wca/leftnav/pa-tasklist/save-and-continue', function (req, res) {
//    if (req.body['pa-tasklist']) {
//    req.session.data['pa-tasklist'] = req.body['pa-tasklist']
//    }
//    res.redirect('/wca/leftnav/pa-tasklist');
//   });



  router.get('/wca/leftnav/mental-health-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/mental-health.html', { 
      session: req.session.data,
      request: req
   });
   });
   
  router.post('/wca/leftnav/mental-health-task/save-and-continue', function (req, res) {
   if (req.body['mental-health-task']) {
   req.session.data['mental-health-task'] = req.body['mental-health-task']
   }
   res.redirect('/wca/leftnav/leftobvstatement-task');
  });


  
  router.get('/wca/leftnav/leftobvstatement-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/informal-observations.html', { 
      session: req.session.data,
      request: req
   });
   });
  
  router.post('/wca/leftnav//leftobvstatement-task/save-and-continue', function (req, res) {
   if (req.body['/leftobvstatement-task']) {
   req.session.data['/leftTypstatement-task'] = req.body['/leftobvstatement-task']
   }
   res.redirect('/wca/leftnav/PA-task');
  });






//   wca tasklist with left nav



router.get('/wca/left-tasklist', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/left-tasklist.html', { session: req.session.data });
  });
   
  router.post('/wca/left-tasklist/save-and-continue', function (req, res) {
   if (req.body['left-tasklist']) {
   req.session.data['left-tasklist'] = req.body['left-tasklist']
   }
   res.redirect('/wca/leftnav/mental-health-task');
  });


router.get('/wca/cardio-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/physical-assessments/Cardiovascular-and-respiratory/cardiovascular.html', { session: req.session.data });
  });
   
  router.post('/wca/cardio-task/save-and-continue', function (req, res) {
   if (req.body['cardio-task']) {
   req.session.data['cardio-task'] = req.body['cardio-task']
   }
   res.redirect('/wca/blood-task');
  });

  router.get('/wca/blood-task', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/physical-assessments/Cardiovascular-and-respiratory/blood-pressue.html', { session: req.session.data });
  });
   
  router.post('/wca/blood-task/save-and-continue', function (req, res) {
   if (req.body['blood-task']) {
   req.session.data['blood-task'] = req.body['cardio-task']
   }
   res.redirect('/wca/left-tasklist');
  });


  router.get('/wca/general-health', function (req, res) {
   res.render('corecomponents/Research/3Navigation/WCA-tasklist/physical-assessments/General-health/GeneralHealth.html', { session: req.session.data });
  });
   
  router.post('/wca/general-health/save-and-continue', function (req, res) {
   if (req.body['general-health']) {
   req.session.data['general-health'] = req.body['general-health']
   }
   res.redirect('/wca/task-list');
  });
  

  router.get('/wca/left-lower-back-legs-task', function (req, res) {
     res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/physical-assessments/Lower-back-and-legs/lowerbacklegs', { session: req.session.data });
    });
     
    router.post('/wca/left-lower-back-legs-task/save-and-continue', function (req, res) {
     if (req.body['left-lower-back-legs-task']) {
     req.session.data['left-lower-back-legs-task'] = req.body['left-lower-back-legs-task']
     }
     res.redirect('/wca/left-right-legs-task');
    });
    
    router.get('/wca/left-right-legs-task', function (req, res) {
      res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/physical-assessments/Lower-back-and-legs/right-leg.html', { session: req.session.data });
     });
      
     router.post('/wca/left-right-legs-task/save-and-continue', function (req, res) {
      if (req.body['/wca/left-right-legs-task']) {
      req.session.data['/wca/left-right-legs-task'] = req.body['left-lower-back-legs-task']
      }
      res.redirect('/wca/left-tasklist');
     });


    router.get('/wca/neck-arms-task', function (req, res) {
     res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/physical-assessments/Neck-and-arms/neckArms.html', { session: req.session.data });
    });
     
    router.post('/wca/neck-arms-task/save-and-continue', function (req, res) {
     if (req.body['neck-arms-task']) {
     req.session.data['neck-arms-task'] = req.body['neck-arms-task']
     }
     res.redirect('/wca/left-neck-task');
    });

    router.get('/wca/left-neck-task', function (req, res) {
      res.render('corecomponents/Research/3Navigation/WCA-Leftnav-tasklist/physical-assessments/Neck-and-arms/neck.html', { session: req.session.data });
     });
      
     router.post('/wca/left-neck-task/save-and-continue', function (req, res) {
      if (req.body['left-neck-task']) {
      req.session.data['left-neck-task'] = req.body['left-neck-task']
      }
      res.redirect('/wca/left-tasklist');
     });

module.exports = router








// Prototype research 4
// WCA

router.get('/wca/task-list4', function (req, res) {
   res.render('corecomponents/Research/4Navigation/WCA-tasklist/TaskList.html', { session: req.session.data })
  })
   
  
  router.get('/wca/attendee4', function (req, res) {
      res.render('corecomponents/Research/4Navigation/WCA-tasklist/additionalAttendee.html', { session: req.session.data });
     });
      
     router.post('/wca/attendee4/save-and-continue', function (req, res) {
      if (req.body['attendee4']) {
      req.session.data['attendee4'] = req.body['attendee4']
      }
      res.redirect('/wca/task-list4');
     });
  
  
  
  
  router.get('/wca/condition-history4', function (req, res) {
   res.render('corecomponents/Research/4Navigation/WCA-tasklist/Conditionhistory.html', { session: req.session.data });
  });
   
  router.post('/wca/condition-history4/save-and-continue', function (req, res) {
   if (req.body['condition-history4']) {
   req.session.data['condition-history4'] = req.body['condition-history4']
   }
   res.redirect('/wca/task-list4');
  });


  router.get('/wca/condition-history-progress4/save-and-continue', function (req, res) {
   req.session.data['condition-history-progress4'] = {inProgress: true};
   res.redirect('/wca/task-list4');
  });
 



router.get('/wca/medication4', function (req, res) {
   res.render('corecomponents/Research/4Navigation/WCA-tasklist/medication.html', { session: req.session.data });
  });
   
  router.post('/wca/medication4/save-and-continue', function (req, res) {
   if (req.body['medication4']) {
   req.session.data['medication4'] = req.body['medication4']
   }
   res.redirect('/wca/task-list4');
  });

router.get('/wca/medication-progress4/save-and-continue', function (req, res) {
   req.session.data['condition-history-progress4'] = {inProgress: true};
   res.redirect('/wca/task-list4');
  });



router.get('/wca/socialstatement4', function (req, res) {
   res.render('corecomponents/Research/4Navigation/WCA-tasklist/SocialWorkHistory.html', { session: req.session.data });
  });
   
  router.post('/wca/socialstatement4/save-and-continue', function (req, res) {
   if (req.body['socialstatement4']) {
   req.session.data['socialstatement4'] = req.body['socialstatement4']
   }
   res.redirect('/wca/task-list4');
  });
    

   router.get('/wca/statement4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/WCA-tasklist/Typical_day.html', { session: req.session.data });
   });
    
   router.post('/wca/statement4/save-and-continue', function (req, res) {
    if (req.body['statement4']) {
    req.session.data['statement4'] = req.body['statement4']
    }
    res.redirect('/wca/task-list4');
   });



   router.get('/wca/observestatement4', function (req, res) {
      res.render('corecomponents/Research/4Navigation/WCA-tasklist/informal-observation.html', { session: req.session.data });
     });
      
     router.post('/wca/observestatement4/save-and-continue', function (req, res) {
      if (req.body['observestatement4']) {
      req.session.data['observestatement4'] = req.body['observestatement4']
      }
      res.redirect('/wca/task-list4');
     });




   router.get('/wca/cardio4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/WCA-tasklist/physical-assessments/Cardiovascular-and-respiratory/cardiovascular.html', { session: req.session.data });
   });
    
   router.post('/wca/cardio4/save-and-continue', function (req, res) {
    if (req.body['cardio4']) {
    req.session.data['cardio4'] = req.body['cardio4']
    }
    res.redirect('/wca/task-list4');
   });


   router.get('/wca/general-health4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/WCA-tasklist/physical-assessments/General-health/GeneralHealth.html', { session: req.session.data });
   });
    
   router.post('/wca/general-health4/save-and-continue', function (req, res) {
    if (req.body['general-health4']) {
    req.session.data['general-health4'] = req.body['general-health4']
    }
    res.redirect('/wca/task-list4');
   });
   

   router.get('/wca/leg-back4', function (req, res) {
      res.render('corecomponents/Research/4Navigation/WCA-tasklist/physical-assessments/Lower-back-and-legs/lowerbacklegs.html', { session: req.session.data });
     });
      
     router.post('/wca/leg-back4/save-and-continue', function (req, res) {
      if (req.body['leg-back4']) {
      req.session.data['leg-back4'] = req.body['leg-back4']
      }
      res.redirect('/wca/task-list4');
     });
     


     router.get('/wca/neck-arms4', function (req, res) {
      res.render('corecomponents/Research/4Navigation/WCA-tasklist/physical-assessments/Neck-and-arms/neckArms.html', { session: req.session.data });
     });
      
     router.post('/wca/neck-arms4/save-and-continue', function (req, res) {
      if (req.body['neck-arms4']) {
      req.session.data['neck-arms4'] = req.body['neck-arms4']
      }
      res.redirect('/wca/task-list4');
     });

     


// PIP Tasklist

   router.get('/pip/task-list4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/0-TaskList.html', { session: req.session.data })
   })
    
   router.get('/pip/evidence-considered4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/1-Consultation-start.html', { session: req.session.data });
   });
    
   router.post('/pip/evidence-considered4/save-and-continue', function (req, res) {
    if (req.body['evidence-considered4']) {
    req.session.data['evidence-considered4'] = req.body['evidence-considered4']
    }
    res.redirect('/pip/task-list4');
   });



   router.get('/pip/add-attendee4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/1a-AddAttendee', { session: req.session.data });
   });
    
   router.post('/pip/add-attendee4/save-and-continue', function (req, res) {
    if (req.body['add-attendee4']) {
    req.session.data['add-attendee4'] = req.body['add-attendee4']
    }
    res.redirect('/pip/task-list4');
   });


   router.get('/pip/history-condition4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/2-History-of-conditions', { session: req.session.data });
   });
    
   router.post('/pip/history-condition4/save-and-continue', function (req, res) {
    if (req.body['history-condition4']) {
    req.session.data['history-condition4'] = req.body['history-condition4']
    }
    res.redirect('/pip/task-list4');
   });

  
   router.get('/pip/medication-name4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/3-Current-medication', { session: req.session.data });
   });
    
   router.post('/pip/medication-name4/save-and-continue', function (req, res) {
    if (req.body['medication-name4']) {
    req.session.data['medication-name4'] = req.body['medication-name4']
    }
    res.redirect('/pip/task-list4');
   });


   router.get('/pip/medication-name-add4', function (req, res) {
      res.render('corecomponents/Research/4Navigation/pip-tasklist/3-Current-medication-addanother.html', { session: req.session.data });
     });
      
     router.post('/pip/medication-name-add4/save-and-continue', function (req, res) {
      if (req.body['medication-name-add4']) {
      req.session.data['medication-name-add4'] = req.body['medication-name-add4']
      }
      res.redirect('/pip/task-list4');
     });
  

   router.get('/pip/social-history4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/4-Social-and-occ-history.html', { session: req.session.data });
   });
    
   router.post('/pip/social-history4/save-and-continue', function (req, res) {
    if (req.body['social-history4']) {
    req.session.data['social-history4'] = req.body['social-history4']
    }
    res.redirect('/pip/task-list4');
   });


   router.get('/pip/variability4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/5-Functional-history.html', { session: req.session.data });
   });
    
   router.post('/pip/variability4/save-and-continue', function (req, res) {
    if (req.body['pip/variability4']) {
    req.session.data['pip/variability4'] = req.body['pip/variability4']
    }
    res.redirect('/pip/task-list4');
   });

   router.get('/pip/observations4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/6-Observations.html', { session: req.session.data });
   });
    
   router.post('/pip/observations4/save-and-continue', function (req, res) {
    if (req.body['pip/observations4']) {
    req.session.data['pip/observations4'] = req.body['pip/observations4']
    }
    res.redirect('/pip/task-list4');
   });
   

   router.get('/pip/mental-state4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/7-Mental-state.html', { session: req.session.data });
   });
    
   router.post('/pip/mental-state4/save-and-continue', function (req, res) {
    if (req.body['pip/mental-state4']) {
    req.session.data['pip/mental-state4'] = req.body['pip/mental-state4']
    }
    res.redirect('/pip/task-list4');
   });


   router.get('/pip/musculoskeletal4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/8-Musculoskeletal', { session: req.session.data });
   });
    
   router.post('/pip/musculoskeletal4/save-and-continue', function (req, res) {
    if (req.body['pip/musculoskeletal4']) {
    req.session.data['pip/musculoskeletal4'] = req.body['pip/musculoskeletal4']
    }
    res.redirect('/pip/task-list4');
   });


   router.get('/pip/other-systems4', function (req, res) {
    res.render('corecomponents/Research/4Navigation/pip-tasklist/9-Other-systems', { session: req.session.data });
   });
    
   router.post('/pip/other-systems4/save-and-continue', function (req, res) {
    if (req.body['pip/other-systems4']) {
    req.session.data['pip/other-systems4'] = req.body['pip/other-systems4']
    }
    res.redirect('/pip/task-list4');
   });



  


   router.get('/wca/scoring', function (req, res) {
      res.render('corecomponents/Research/4Navigation/WCA-tasklist/Scoring.html', { session: req.session.data });
     });
      

     router.get('/wca/descriptor/mobile', function (req, res) {
      res.render('corecomponents/Research/4Navigation/WCA-tasklist/descriptors/Mobilising_descriptors.html', { session: req.session.data });
     });

     router.post('/wca/descriptor/mobile/save-and-continue', function (req, res) {
      if (req.body['wca/descriptor/mobile']) {
      req.session.data['wca/descriptor/mobile'] = req.body['wca/descriptor/mobile']
      }
      res.redirect('/wca/scoring');
     });

   