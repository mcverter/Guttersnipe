'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  thing: {
    type: Schema.ObjectId,
    ref: 'ThingSchema'
  },
  place: {
    type: Schema.ObjectId,
    ref: 'PlaceSchema'
  },
  time: {
    type: Schema.ObjectId,
    ref: 'TimeSchema'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }

});

mongoose.model('Resource', ResourceSchema);
