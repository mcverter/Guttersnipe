'use strict';

//Places service used to communicate Places REST endpoints
angular.module('places').factory('Places', ['$resource',
	function($resource) {
		return $resource('places/:placeId', { placeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);