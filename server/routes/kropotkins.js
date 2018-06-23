var express = require('express');
var router = express.Router();
var kropotkinDB = require(__dirname + '/../controllers/KropotkinController');

const kropotkinController = new kropotkinDB()

router.get('/', function(req, res, next) {
  console.log('Hello Kropotkin Router')
  kropotkinController.selectRandomKropotkin()
    .then(function(paragraph){
      console.log('paragraph', paragraph);
      res.json({
        error:false,
        paragraph
      })
    })
    .catch(function(error){
      console.error('ERROR', error)
    })
});


module.exports = router;
