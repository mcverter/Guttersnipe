'use strict';

//Setting up route
angular.module('resources').config(['$stateProvider',
	function($stateProvider) {
		// Resources state routing
		$stateProvider.
		state('listResources', {
			url: '/resources',
			templateUrl: 'modules/resources/views/list-resources.client.view.html'
		}).
		state('createResource', {
			url: '/resources/create',
			templateUrl: 'modules/resources/views/create-resource.client.view.html'
		}).
		state('viewResource', {
			url: '/resources/:resourceId',
			templateUrl: 'modules/resources/views/view-resource.client.view.html'
		}).
		state('editResource', {
			url: '/resources/:resourceId/edit',
			templateUrl: 'modules/resources/views/edit-resource.client.view.html'
		});
	}
]);