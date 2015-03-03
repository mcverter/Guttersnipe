
var mongodb = require('mongodb'),
  _ = require('lodash'),
  kropotkinData = require ('./data/kropotkin.data.js'),
  bread = kropotkinData.conquestofbread
  ;

exports.up = function(db, next){
  db.createCollection('kropotkins');
  var kropotkin = mongodb.Collection(db, 'kropotkins');
  var idx = -1;
  _.forEach(bread, function(data) {
    idx++;
    kropotkin.insert({
        paragraph: data.paragraph,
        index: idx
      },
      function(err) {
        if (err) {
          console.err('Error: ' + err);
        }
      });
  });
  next();
};

exports.down = function(db, next){
  db.kropotkins.drop();
  next();
};
