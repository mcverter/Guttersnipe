var express = require('express');
var router = express.Router();
var shareableDB = require(__dirname + '/../controllers/ShareableController');

const shareableController = new shareableDB();
/* GET shareables listing. */
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

/* GET single shareable with comments. */
router.get('/:id', function(req, res, next) {
  console.log('Hello Shareable Router')
  shareableController.selectShareableWithComments(req.params.id)
    .then(function(collection){
      console.log('collection', collection);
      res.json({
        error:false,
        data: collection
      })
    })
});
module.exports = router;
