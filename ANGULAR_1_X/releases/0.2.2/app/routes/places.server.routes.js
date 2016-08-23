'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var places = require('../../app/controllers/places.server.controller');

	// Places Routes
	app.route('/places')
		.get(places.list)
		.post(users.requiresLogin, places.create);

	app.route('/places/:placeId')
		.get(places.read)
		.put(users.requiresLogin, places.hasAuthorization, places.update)
		.delete(users.requiresLogin, places.hasAuthorization, places.delete);

	// Finish by binding the Place middleware
	app.param('placeId', places.placeByID);
};
