var express = require('express');
var router = express.Router();
var shareableDB = require('./../../db/controllers/Shareable');

const shareableController = new shareableDB();
/* GET users listing. */
router.get('/', function(req, res, next) {
  shareableController.selectOneRecord(1)
    .then(function(collection){
      res.json({
        error:false,
        data: collection
      })
    })

});

module.exports = router;
