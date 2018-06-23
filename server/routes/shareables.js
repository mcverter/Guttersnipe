var express = require('express');
var router = express.Router();
var shareableDB = require(__dirname + '/../controllers/ShareableController');

const shareableController = new shareableDB();
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Hello Shareable Router')
  shareableController.selectShareablesList()
    .then(function(collection){
      console.log('collection', collection);
      res.json({
        error:false,
        data: collection
      })
    })
});

module.exports = router;
