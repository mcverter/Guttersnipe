'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Time = mongoose.model('Time'),
	_ = require('lodash');

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
