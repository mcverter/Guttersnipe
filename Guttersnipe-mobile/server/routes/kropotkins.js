var express = require('express');
var router = express.Router();
var kropotkinDB = require('./../../db/controllers/Kropotkin');
const kropotkinController = new kropotkinDB()

router.get('/', function(req, res, next) {
  kropotkinController.selectRandomRecord()
    .then(function(collection){
      res.json({
        error:false,
        paragraph: collection.rows[0].paragraph
      })
    })
});


module.exports = router;
