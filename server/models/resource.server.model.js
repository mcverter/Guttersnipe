'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// node add-freegan-bk.js 
var weekdayEnum = 	   ['all', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  recurrenceTypeEnum = ['A', '1', '2', '3', '4', 'L'];


var ResourceSchema = new Schema({
  thing: {
    description: {
      summary : {
        type: String,
        required: true
      },
      notes : {
        type: String,
        required: false
      },
      method: {
        type: String,
        required: false
      },
      headline : {
        type: String,
        required: true
      }
    },
    taxonomy : {
      type : {
        type: String,
        required: true
      },
      subtypes : [String],
      details : [String]
    }
  },
  place: {
    coordinates : {
      lat : {
        type: Number,
        required: true
      },
      lng : {
        type: Number,
        required: true
      }
    },
    name: {
      type: String
    },
    address : {
      type: String,
      required: true
    },
    notes : {
      type: String,
      required: false
    }
  },


  time: {
    schedules : [
      {
        punctualDate: {
          type: Date
        },
        recurringDay : {
          type: String,
          enum: weekdayEnum
        },
        recurrenceType: {
          type: String,
          enum: recurrenceTypeEnum
        },
        startTime : {
          type: Number,
          required: true
        },
        duration : {
          type: Number,
          required: true
        }
      }
    ],
    notes : {
      type: String,
      required: false
    }
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
