'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Time = mongoose.model('Time'),
  Schedule = mongoose.model('Schedule'),
	_ = require('lodash');

var REPETITION_ENUM = [
  {
    abbr: 'N',
    full: 'None'
  }, {
    abbr: 'E',
    full: 'Every Week'
  }, {
    abbr: '1',
    full: 'First Week of Every Month'
  },{
    abbr: '2',
    full: 'Second Week of Every Month'
  }, {
    abbr: '3',
    full: 'Third Week of Every Month'
  }, {
    abbr: 'L',
    full: 'Last Week of Every Month'
  }, {
    abbr: 'Y',
    full: "Every Year"
  }
];

/**
 *
 * Every resource is assigned a Time.
 * A "Time" object is collection of schedules.
 * A "Schedule" consists of
 *    (1) A Date
 *    (2) A Duration.
 *    (3) A Repetition ENUM
 *
 * Schedules are like "sparse matrixes".
 * Every Thursday from 6-9 PM is a timeslot that can be attached to
 *   multiple different events.
 *
 * That said, the folowing rules pertain to Schedules:
 * (1) DELETE:  Schedules can never be deleted.  They can only be removed.
 * (2) CREATE:  Only create a new Schedule if it does not exist
 * (3) READ:  Normal read
 * (4) UPDATE:  When changing a schedule, what you are doing is
 *          removing the link to that schedule and creating a link to a new one.
 *
 */
var createSchedule = function(date, duration, repetition) {
  if (Schedule.find) {

  }
};

var updateSchedule = function() {

};

var createSchedule = function() {

};

/**
 * Create a Time
 */
exports.create = function(req, res) {
	var time = new Time(req.body);
	time.user = req.user;

	time.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(time);
		}
	});
};

/**
 * Show the current Time
 */
exports.read = function(req, res) {
	res.jsonp(req.time);
};

/**
 * Update a Time
*/
exports.update = function(req, res) {
	var time = req.time ;

	time = _.extend(time , req.body);

	time.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(time);
		}
	});
};

/**
 * Delete an Time
 */
exports.delete = function(req, res) {
	var time = req.time ;

	time.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(time);
		}
	});
};

/**
 * List of Times
 */
exports.list = function(req, res) { 
	Time.find().sort('-created').populate('user', 'displayName').exec(function(err, times) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(times);
		}
	});
};

/**
 * Time middleware
 */
exports.timeByID = function(req, res, next, id) { 
	Time.findById(id).populate('user', 'displayName').exec(function(err, time) {
		if (err) return next(err);
		if (! time) return next(new Error('Failed to load Time ' + id));
		req.time = time ;
		next();
	});
};

/**
 * Time authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.time.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
