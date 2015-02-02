'use strict';

//Resources service used to communicate Resources REST endpoints
angular.module('resources').factory('Resources', ['$resource',
	function($resource) {
		return $resource('resources/:resourceId', { resourceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);