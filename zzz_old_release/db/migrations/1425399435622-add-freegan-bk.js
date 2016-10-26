var db = require('./config/db'),
  _ = require('lodash'),
  Place = db.Place,
  Time = db.Time,
  Thing = db.Thing,
  Resource = db.Resource,
  bkFreeganData = require ('./data/bk.freegan.data.js'),
  resources = bkFreeganData.resources;

console.log(resources);


exports.up = function(next){
  console.log('add freegan bk up');
  _.forEach(resources, function(data) {
    console.log('Freegan Record', data);
    Resource.create(data,
      function (err, resource) {
        if (err) {
          console.err('Mongoose error :', err);
        } else {
          console.log('Resource saved!', resource);
        }
      });
  });
  next();
};

exports.down = function(next){
  console.log('add freegan bk down');
  next();
};


/*
 var mongoose = require('mongoose'),
 userSchema = new mongoose.Schema({
 name: String,
 email: {
 type: String,
 unique: true
 },
 createdOn: {
 type: Date,
 default: Date.now
 },
 modifiedOn: Date,
 lastLogin: Date

 });

 mongoose.model('User', userSchema);

 var user1 = newUser({name: 'Simon'});
 var user2 = newUser({name: 'Sally'});
 console.log(userOne.name);
 userOne.name = 'Simon Holmes';
 console.log(userOne.name);

 user1.save (function(err) {
 if (err) return handleError(err);
 });

 user2.save (function(err) {
 if (err) return handleError(err);
 });


 User.findOne({'name':'Sally'}, function(err, user) {
 if (!err) {
 console.log(user);
 }
 });



 User.find({}, function(err, users) {
 if (!err) {
 console.log(users);
 }
 });
 */