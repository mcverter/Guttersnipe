'use strict';

// Places controller
angular.module('places').controller('PlacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Places',
	function($scope, $stateParams, $location, Authentication, Places) {
		$scope.authentication = Authentication;

		// Create new Place
		$scope.create = function() {
			// Create new Place object
			var place = new Places ({
				name: this.name
			});

			// Redirect after save
			place.$save(function(response) {
				$location.path('places/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Place
		$scope.remove = function(place) {
			if ( place ) { 
				place.$remove();

				for (var i in $scope.places) {
					if ($scope.places [i] === place) {
						$scope.places.splice(i, 1);
					}
				}
			} else {
				$scope.place.$remove(function() {
					$location.path('places');
				});
			}
		};

		// Update existing Place
		$scope.update = function() {
			var place = $scope.place;

			place.$update(function() {
				$location.path('places/' + place._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Places
		$scope.find = function() {
			$scope.places = Places.query();
		};

		// Find existing Place
		$scope.findOne = function() {
			$scope.place = Places.get({ 
				placeId: $stateParams.placeId
			});
		};
	}
]);