'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var resources = require('../../app/controllers/resources.server.controller');

	// Resources Routes
	app.route('/resources')
		.get(resources.list)
		.post(users.requiresLogin, resources.create);

	app.route('/resources/:resourceId')
		.get(resources.read)
		.put(users.requiresLogin, resources.hasAuthorization, resources.update)
		.delete(users.requiresLogin, resources.hasAuthorization, resources.delete);

	// Finish by binding the Resource middleware
	app.param('resourceId', resources.resourceByID);
};
