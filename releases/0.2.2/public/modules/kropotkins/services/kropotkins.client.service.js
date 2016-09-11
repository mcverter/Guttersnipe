'use strict';

//Kropotkins service used to communicate Kropotkins REST endpoints
angular.module('kropotkins').factory('Kropotkins', ['$resource',
	function($resource) {
		return $resource(
      'kropotkins/:kropotkinId',
      { kropotkinId: '@_id'},
      {update: {method: 'PUT'}, isArray: false}
    );
	}
]);