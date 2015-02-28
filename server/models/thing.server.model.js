'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Thing Schema
 *
 * @type {Schema}
 */

var TaxonomySchema = new Schema({
  type : {
    type: String,
    required: true
  },
  subtypes : [String],
  details : [String]
})

var DescriptionSchema = new Schema ({
  headline : {
    type: String,
    required: true
  },
  summary : {
    type: String,
    required: true
  },
  notes : {
    type: String,
    required: false
  }
});


var ThingSchema = new Schema({
  description: {
    type: Schema.ObjectId,
    ref: 'DescriptionSchema'
  },
  taxonomy : {
    type: Schema.ObjectId,
    ref: 'TaxonomySchema'
  }

});

mongoose.model('Thing', ThingSchema);