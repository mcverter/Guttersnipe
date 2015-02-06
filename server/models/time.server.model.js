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
mongoose.model('Schedule', ScheduleSchema);
mongoose.model('Time', TimeSchema);