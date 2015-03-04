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
    description: {
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
      type: String,
      required: true
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
        startDateTime: {
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
