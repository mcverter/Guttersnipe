'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Time Schema
 *
 * @type {Schema}
 */

var ScheduleSchema = new Schema ({
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
});

var TimeSchema = new Schema ({
  schedules : [ScheduleSchema],
  notes : {
    type: String,
    required: false
  }
});
mongoose.model('Schedule', ScheduleSchema);
mongoose.model('Time', TimeSchema);