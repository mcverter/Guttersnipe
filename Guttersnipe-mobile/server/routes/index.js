var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shareables', function(req, res, next){
  res.render('shareables');
})
module.exports = router;
