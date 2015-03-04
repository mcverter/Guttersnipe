var db = require('../config/db'),
  mongoose = db.mongoose,
  _ = require('lodash'),
  bkFreeganData = require ('../data/bk.freegan.data.js'),
  resources = bkFreeganData.resources;

var Resource = mongoose.model('Resource');

console.log('add freegan bk up');
_.forEach(resources, function(data) {
  Resource.create(data,
    function (err, resource) {
      console.log("Data", data);
      if (err) {
        console.log('Mongoose error :', err);
      } else {
        console.log('Resource saved!', resource);
        console.log('Time', resource.time);
        console.log('Thing', resource.thing);
        console.log('Place', resource.place);
      }
    });
});

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