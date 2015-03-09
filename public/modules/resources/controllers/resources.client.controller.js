(function (angular, _) { 'use strict';

  angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
    function($scope, $stateParams, $location, Authentication, Resources) {
      $scope.authentication = Authentication;

      $scope.create = function() {
        var resource = new Resources({
          title: this.title,
          content: this.content
        });
        resource.$save(function(response) {
          $location.path('resources/' + response._id);

          $scope.title = '';
          $scope.content = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.remove = function(resource) {
        if (resource) {
          resource.$remove();

          for (var i in $scope.resources) {
            if ($scope.resources[i] === resource) {
              $scope.resources.splice(i, 1);
            }
          }
        } else {
          $scope.resource.$remove(function() {
            $location.path('resources');
          });
        }
      };

      $scope.update = function() {
        var resource = $scope.resource;

        resource.$update(function() {
          $location.path('resources/' + resource._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.find = function() {
        $scope.resources = Resources.query();
      };

      $scope.findOne = function() {
        Resources.get({
          resourceId: $stateParams.resourceId
        }).$promise.then(function(rsc) {
            $scope.resource = rsc;
            $scope.options = {scrollwheel: false};
            var coordinates = $scope.resource.place.coordinates;

            $scope.map = {
              center: {
                latitude: coordinates.lat,
                longitude: coordinates.lng
              },
              marker : {
                id: 0,
                coords: {
                  latitude: coordinates.lat,
                  longitude: coordinates.lng
                },
                options: { draggable: false }
              },
              zoom: 16
            };
          });
      };
    }
  ]);
})(window.angular, window._);