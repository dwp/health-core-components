const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


// statement Navigation

router.post("/wca_v1/TakingStatementsentry-post", function(req, res, next){

  if(req.body['comment'] === 'add-statement'){
    res.redirect('/wca_v1/condition_history_saved');
  } else {
    res.redirect('/wca_v1/TakingStatementsentry');
  }
  next();
});
