'use strict';

// Resources controller
angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
	function($scope, $stateParams, $location, Authentication, Resources) {
		$scope.authentication = Authentication;

		// Create new Resource
		$scope.create = function() {
			// Create new Resource object
			var resource = new Resources ({
				name: this.name
			});

			// Redirect after save
			resource.$save(function(response) {
				$location.path('resources/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resource
		$scope.remove = function(resource) {
			if ( resource ) { 
				resource.$remove();

				for (var i in $scope.resources) {
					if ($scope.resources [i] === resource) {
						$scope.resources.splice(i, 1);
					}
				}
			} else {
				$scope.resource.$remove(function() {
					$location.path('resources');
				});
			}
		};

		// Update existing Resource
		$scope.update = function() {
			var resource = $scope.resource;

			resource.$update(function() {
				$location.path('resources/' + resource._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resources
		$scope.find = function() {
			$scope.resources = Resources.query();
		};

		// Find existing Resource
		$scope.findOne = function() {
			$scope.resource = Resources.get({ 
				resourceId: $stateParams.resourceId
			});
		};
	}
]);