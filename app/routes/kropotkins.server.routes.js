'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var kropotkins = require('../../app/controllers/kropotkins.server.controller');

	// Kropotkins Routes
	app.route('/kropotkins')
		.get(kropotkins.list)
		.post(users.requiresLogin, kropotkins.create);

	app.route('/kropotkins/:kropotkinId')
		.get(kropotkins.read)
		.put(users.requiresLogin, kropotkins.hasAuthorization, kropotkins.update)
		.delete(users.requiresLogin, kropotkins.hasAuthorization, kropotkins.delete);

	// Finish by binding the Kropotkin middleware
	app.param('kropotkinId', kropotkins.kropotkinByID);
};
