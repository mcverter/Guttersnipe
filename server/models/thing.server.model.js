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

var TaxonSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

var TaxonomySchema = new Schema({
  type : {
    type: Schema.ObjectId,
    ref: 'TaxonSchema'
  },
  details : [TaxonSchema]
})

var DescriptionSchema = new Schema ({
  headline : {
    type: String,
    required: true
  },
  summary : {
    type: String,
    required: true
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