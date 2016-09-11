'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Thing = mongoose.model('Thing'),
	_ = require('lodash');

/**
 * Create a Thing
 */
exports.create = function(req, res) {
	var thing = new Thing(req.body);
	thing.user = req.user;

	thing.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(thing);
		}
	});
};

/**
 * Show the current Thing
 */
exports.read = function(req, res) {
	res.jsonp(req.thing);
};

/**
 * Update a Thing
 */
exports.update = function(req, res) {
	var thing = req.thing ;

	thing = _.extend(thing , req.body);

	thing.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(thing);
		}
	});
};

/**
 * Delete an Thing
 */
exports.delete = function(req, res) {
	var thing = req.thing ;

	thing.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(thing);
		}
	});
};

/**
 * List of Things
 */
exports.list = function(req, res) { 
	Thing.find().sort('-created').populate('user', 'displayName').exec(function(err, things) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(things);
		}
	});
};

/**
 * Thing middleware
 */
exports.thingByID = function(req, res, next, id) { 
	Thing.findById(id).populate('user', 'displayName').exec(function(err, thing) {
		if (err) return next(err);
		if (! thing) return next(new Error('Failed to load Thing ' + id));
		req.thing = thing ;
		next();
	});
};

/**
 * Thing authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.thing.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
