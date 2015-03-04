var db = require('./config/db'),
  _ = require('lodash'),
  kropotkinData = require ('./data/kropotkin.data.js'),
  bread = kropotkinData.conquestofbread
  ;
console.log('in add kropotkins');
exports.up = function(next){
  console.log('migrate kropotkins up');
  /*
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
  */
  next();
};

exports.down = function(next){
  console.log('migrate kropotkins down');

  /*
  db.kropotkins.drop();
  */
  next();
};


/**
 *
 * // Setup mongoose
 var mongoose = require('./db');

 exports.up = function(next) {
  // get a brand new connection for this patch.
  mongoose.connect('mongodb://localhost/sagedb');

  var adminUser = {
    username: 'admin',
    password: 'admin'
  };

  User.createUser(adminUser, function(err, user) {
    if (err)  {
       mongoose.disconnect();  // Make sure to close connection
       return next(err);
    }

    mongoose.disconnect(next); // Make sure to close connection
  });
};

 exports.down = function(next) {
  mongoose.connect('mongodb://localhost/sagedb'); // new connection for down

  User.getUserByUsername('admin', function(err, user) {
    if (err) {
      mongoose.disconnect(function() { // make sure to close connection
        return next(err);
      });
    }

    if (!user) {
      mongoose.disconnect(); // make sure to close connection
      return next();
    }

    User.deleteUser(user, function(err, user) {
      console.log('deleted user');
      mongoose.disconnect(next); // make sure to close connection
    });
  });
};
 */