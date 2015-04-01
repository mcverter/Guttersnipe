(function (angular, _) {
  'use strict';

//Setting up route
angular.module('times').config(['$stateProvider',
	function($stateProvider) {
		// Times state routing
		$stateProvider.
		state('listTimes', {
			url: '/times',
			templateUrl: 'modules/times/templates/list-times.client.view.html'
		}).
		state('createTime', {
			url: '/times/create',
			templateUrl: 'modules/times/templates/create-time.client.view.html'
		}).
		state('viewTime', {
			url: '/times/:timeId',
			templateUrl: 'modules/times/templates/view-time.client.view.html'
		}).
		state('editTime', {
			url: '/times/:timeId/edit',
			templateUrl: 'modules/times/templates/edit-time.client.view.html'
		});
	}
]);
})(window.angular, window._);