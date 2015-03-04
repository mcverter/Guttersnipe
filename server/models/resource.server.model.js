'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  method: {
    type: String,
    required: false
  },
  notes:  {
    type: String,
    required: false
  },


  thing: {
    type: Schema.ObjectId,
    ref: 'ThingSchema',
    required: true
  },


  place: {
    type: Schema.ObjectId,
    ref: 'PlaceSchema',
    required: true
  },


  time: {
    type: Schema.ObjectId,
    ref: 'TimeSchema',
    required: true
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
