'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Kropotkin Schema
 */
var KropotkinSchema = new Schema({
  paragraph: {
    type: String,
    trim: true,
    unique: true,
    upsert: true
  },
  index: {
    type: Number,
    unique: true
  }
});


KropotkinSchema.statics.random = function(cb) {
  var self = this;
  self.count(function(err, count) {
    if (err) return cb(err);
    var rand = Math.floor(Math.random() * count);
    self.findOne({index: rand}, cb);
  });
};

var Kropotkin = mongoose.model('Kropotkin', KropotkinSchema);

mongoose.model('Kropotkin', KropotkinSchema);