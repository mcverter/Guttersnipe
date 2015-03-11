(function (angular, _) { 'use strict';

  angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
    function($scope, $stateParams, $location, Authentication, Resources) {

      var resource = {
        method: '',
        notes: '',
        headline: '',
        thing: {
          description: {
            summary: '',
            notes: ''
          },
          taxonomy: {
            type: '',
            subtypes: [],
            details: []
          }
        },
        place: {
          coordinates: {
            lat: '',
            lng: ''
          },
          name: '',
          address: '',
          notes: ''
        },
        time: {
          schedules: [],
          notes: ''
        }
      };


      Object.defineProperties($scope, {
        resource: {
          enumerable: true,
          get: function () {
            return resource;
          },
          set: function (val) {
            resource = val
          }
        },
        authentication: {
          enumerable: true,
          get: function () {
            return Authentication;
          },
          set: function (val) {
            Authentication = val
          }

        }
      });
      $scope.create =  function()
      {
        var resource = new Resources({
          resource: this.resource
        });
        resource.$save(function (response) {
          $location.path('resources/' + response._id);

          $scope.resource = {};
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      },
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
            var createAgreed = false;

            console.log("receourse gotten is ", rsc)

            $scope.resource = rsc;
            $scope.options = {scrollwheel: false};
            var coordinates = $scope.resource.place.coordinates;
            console.log("coords is ", coordinates)

            Object.defineProperties($scope, {
              createAgreed: {
                enumerable: true,
                get: function getCreateAgreed() {
                  return createAgreed;
                },
                set: function setCreateAgreed(val) {
                  return createAgreed = val;
                }
              }
            });
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
              }
            console.log("scoop", $scope);
          });
      };
    }
  ]);
})(window.angular, window._);