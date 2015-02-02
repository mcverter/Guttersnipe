'use strict';

module.exports = function(app) {
	var users = require('../../server/controllers/users.server.controller');
	var times = require('../../server/controllers/times.server.controller');

	// Times Routes
	app.route('/times')
		.get(times.list)
		.post(users.requiresLogin, times.create);

	app.route('/times/:timeId')
		.get(times.read)
		.put(users.requiresLogin, times.hasAuthorization, times.update)
		.delete(users.requiresLogin, times.hasAuthorization, times.delete);

	// Finish by binding the Time middleware
	app.param('timeId', times.timeByID);
};
