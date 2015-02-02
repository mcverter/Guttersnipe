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

/**
 * Time Schema
 *
 * @type {Schema}
 */
var ScheduleSchema = new Schema ({
  startTime: {
    type: Date,
    required: true
  },
  duration : {
    type: Number,
    required: true
  },
  recurrence: {
    type: String,
    required: false
  }
});

var TimeSchema = new Schema ({
  schedules : [ScheduleSchema]
});

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
