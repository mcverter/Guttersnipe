'use strict';

module.exports = function(app) {
	var users = require('../../server/controllers/users.server.controller');
	var resources = require('../../server/controllers/resources.server.controller');

	// Resources Routes
	app.route('/resources')
		.get(resources.list)
		.post(users.requiresLogin, resources.create);

	app.route('/resources/:resourceId')
		.get(resources.read)
		.put(users.requiresLogin, resources.hasAuthorization, resources.update)
		.delete(users.requiresLogin, resources.hasAuthorization, resources.delete);

    app.route('/resources/:resourceId/rate')
        .post(users.requiresLogin, resources.addRating);


    app.route('/resources/:resourceId/comment')
        .put(users.requiresLogin, resources.addComment);

	// Finish by binding the Resource middleware
	app.param('resourceId', resources.resourceByID);
};
