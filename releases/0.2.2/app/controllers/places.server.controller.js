'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Place = mongoose.model('Place'),
	_ = require('lodash');

/**
 * Create a Place
 */
exports.create = function(req, res) {
	var place = new Place(req.body);
	place.user = req.user;

	place.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(place);
		}
	});
};

/**
 * Show the current Place
 */
exports.read = function(req, res) {
	res.jsonp(req.place);
};

/**
 * Update a Place
 */
exports.update = function(req, res) {
	var place = req.place ;

	place = _.extend(place , req.body);

	place.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(place);
		}
	});
};

/**
 * Delete an Place
 */
exports.delete = function(req, res) {
	var place = req.place ;

	place.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(place);
		}
	});
};

/**
 * List of Places
 */
exports.list = function(req, res) { 
	Place.find().sort('-created').populate('user', 'displayName').exec(function(err, places) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(places);
		}
	});
};

/**
 * Place middleware
 */
exports.placeByID = function(req, res, next, id) { 
	Place.findById(id).populate('user', 'displayName').exec(function(err, place) {
		if (err) return next(err);
		if (! place) return next(new Error('Failed to load Place ' + id));
		req.place = place ;
		next();
	});
};

/**
 * Place authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.place.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
