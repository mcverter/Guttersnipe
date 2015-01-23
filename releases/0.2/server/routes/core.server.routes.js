'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../server/controllers/core.server.controller');
	app.route('/').get(core.index);
};