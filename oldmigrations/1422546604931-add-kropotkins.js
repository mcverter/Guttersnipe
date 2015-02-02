var config = require('../config/config'),
  db = config.db,
  _ = require('lodash'),
  kropotkinData = require ('./kropotkin.server.data'),
  bread = kropotkinData.conquestofbread
  ;
console.log(config);

console.log(db);
exports.up = function(next){
  _.forEach(bread, function(data) {
    //console.log(data);
  });
  next();
};

exports.down = function(next){
  next();
};
