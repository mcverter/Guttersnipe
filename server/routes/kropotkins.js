var express = require('express');
var router = express.Router();
var kropotkinDB = require(__dirname + '/../controllers/KropotkinController');

const kropotkinController = new kropotkinDB()

router.get('/', function(req, res, next) {
  kropotkinController.selectRandomRecord()
    .then(function(collection){
      console.log('collection', collection);
      res.json({
        error:false,
        paragraph: collection.rows[0].k_paragraph
      })
    })
});


module.exports = router;
