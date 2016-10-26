'use strict';

//Setting up route
angular.module('places').config(['$stateProvider',
	function($stateProvider) {
		// Places state routing
		$stateProvider.
		state('listPlaces', {
			url: '/places',
			templateUrl: 'modules/places/views/list-places.client.view.html'
		}).
		state('createPlace', {
			url: '/places/create',
			templateUrl: 'modules/places/views/create-place.client.view.html'
		}).
		state('viewPlace', {
			url: '/places/:placeId',
			templateUrl: 'modules/places/views/view-place.client.view.html'
		}).
		state('editPlace', {
			url: '/places/:placeId/edit',
			templateUrl: 'modules/places/views/edit-place.client.view.html'
		});
	}
]);