'use strict';

//Times service used to communicate Times REST endpoints
angular.module('times').factory('Times', ['$resource',
	function($resource) {
		return $resource('times/:timeId', { timeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);