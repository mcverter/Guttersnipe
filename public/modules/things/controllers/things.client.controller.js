(function (angular, _) {
  'use strict';

// Things controller
  angular.module('things').controller('ThingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Things',
    function($scope, $stateParams, $location, Authentication, Things) {
      $scope.authentication = Authentication;
      $scope.isSummarySet = false;

      // Create new Thing
      $scope.create = function() {
        // Create new Thing object
        var thing = new Things ({
          name: this.name
        });

        // Redirect after save
        thing.$save(function(response) {
          $location.path('things/' + response._id);

          // Clear form fields
          $scope.name = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Remove existing Thing
      $scope.remove = function(thing) {
        if ( thing ) {
          thing.$remove();

          for (var i in $scope.things) {
            if ($scope.things [i] === thing) {
              $scope.things.splice(i, 1);
            }
          }
        } else {
          $scope.thing.$remove(function() {
            $location.path('things');
          });
        }
      };

      // Update existing Thing
      $scope.update = function() {
        var thing = $scope.thing;

        thing.$update(function() {
          $location.path('things/' + thing._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Find a list of Things
      $scope.find = function() {
        $scope.things = Things.query();
      };

      // Find existing Thing
      $scope.findOne = function() {
        $scope.thing = Things.get({
          thingId: $stateParams.thingId
        });
      };
    }
  ]);
})(window.angular, window._);