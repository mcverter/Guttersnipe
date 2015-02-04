'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Place Schema
 *
 * @type {Schema}
 */

var PlaceSchema = new Schema ({
  placeDescription : {
    type: String,
    required: true
  },
  normalizedAddress : {
    type: String,
    required: true
  },

  location : {
    lat : {
      type: Number,
      required: true
    },
    lng : {
      type: Number,
      required: true
    }
  }
});

mongoose.model('Place', PlaceSchema);