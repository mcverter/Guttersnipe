var mongoose = require('./config/db'),
  _ = require('lodash')
  ;
exports.up = function(db, next){
  next();
};

exports.down = function(db, next){
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