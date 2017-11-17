var express = require('express');
var router = express.Router();
var models = require('../models');
console.log('foo');
var sequelize = models.sequelize;

/* GET users listing. */
router.get('/', function(req, res, next) {
  const query="SELECT paragraph FROM kropotkin OFFSET floor(random()*(select count(*) from kropotkin)) LIMIT 1;"
  sequelize.query(query)
    .then(result => {
      res.send(JSON.stringify(result[0][0])).status(200);
    })
    .catch(error => {
      console.log(error);
      res.send('respond with an error');

    });

});

module.exports = router;
