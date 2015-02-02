'use strict';

//Setting up route
angular.module('times').config(['$stateProvider',
	function($stateProvider) {
		// Times state routing
		$stateProvider.
		state('listTimes', {
			url: '/times',
			templateUrl: 'modules/times/views/list-times.client.view.html'
		}).
		state('createTime', {
			url: '/times/create',
			templateUrl: 'modules/times/views/create-time.client.view.html'
		}).
		state('viewTime', {
			url: '/times/:timeId',
			templateUrl: 'modules/times/views/view-time.client.view.html'
		}).
		state('editTime', {
			url: '/times/:timeId/edit',
			templateUrl: 'modules/times/views/edit-time.client.view.html'
		});
	}
]);