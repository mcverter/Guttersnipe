'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Kropotkin = mongoose.model('Kropotkin'),
	_ = require('lodash');

/**
 * Create a Kropotkin
 */
exports.create = function(req, res) {
	var kropotkin = new Kropotkin(req.body);
	kropotkin.user = req.user;

	kropotkin.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kropotkin);
		}
	});
};

/**
 * Show the current Kropotkin
 */
exports.read = function(req, res) {
	res.jsonp(req.kropotkin);
};

/**
 * Update a Kropotkin
 */
exports.update = function(req, res) {
	var kropotkin = req.kropotkin ;

	kropotkin = _.extend(kropotkin , req.body);

	kropotkin.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kropotkin);
		}
	});
};

/**
 * Delete an Kropotkin
 */
exports.delete = function(req, res) {
	var kropotkin = req.kropotkin ;

	kropotkin.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kropotkin);
		}
	});
};

/**
 * List of Kropotkins
 */
exports.list = function(req, res) { 
	Kropotkin.find().sort('-created').populate('user', 'displayName').exec(function(err, kropotkins) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kropotkins);
		}
	});
};

/**
 * Kropotkin middleware
 */
exports.kropotkinByID = function(req, res, next, id) {
  console.log("id " + id);
  if (id === "random") {
    Kropotkin.random (function(err, kropotkin) {
      if (err) return next(err);
      if (!kropotkin) return next(new Error('Failed to load Kropotkin ' + id));
      req.kropotkin = kropotkin;
      console.log(kropotkin);
      next();
    });
  }
  else {
    Kropotkin.findById(id).populate('user', 'displayName').exec(function (err, kropotkin) {
      if (err) return next(err);
      if (!kropotkin) return next(new Error('Failed to load Kropotkin ' + id));
      console.log(kropotkin);
      req.kropotkin = kropotkin;
      next();
    });
  }
};

/**
 * Kropotkin authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.kropotkin.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
