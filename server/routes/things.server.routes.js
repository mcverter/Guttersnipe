'use strict';

module.exports = function(app) {
	var users = require('../../server/controllers/users.server.controller');
	var things = require('../../server/controllers/things.server.controller');

	// Things Routes
	app.route('/things')
		.get(things.list)
		.post(users.requiresLogin, things.create);

	app.route('/things/:thingId')
		.get(things.read)
		.put(users.requiresLogin, things.hasAuthorization, things.update)
		.delete(users.requiresLogin, things.hasAuthorization, things.delete);

	// Finish by binding the Thing middleware
	app.param('thingId', things.thingByID);
};
