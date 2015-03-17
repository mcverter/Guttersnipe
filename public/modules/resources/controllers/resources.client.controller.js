(function (angular, _) { 'use strict';

  angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
    function($scope, $stateParams, $location, Authentication, Resources) {
      $scope.resource = Resources.getEmptyResource;
      $scope.createAgreed = false;


      $scope.Authentication = Authentication;
      $scope.create =  function()
      {
        console.log ('creating resource');
        var resource = new Resources({
          resource: this.resource
        });
        console.log('resource is', resource)
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
            }
          });
      };
    }
  ]);
})(window.angular, window._);


/*
 $scope.addTime = function(){};
 $scope.addPlace = function(){};
 $scope.addThingSummary = function(){};
 $scope.addThingTaxonomy = function(){};

 $scope.updateTime = function(){};
 $scope.updatePlace = function(){};
 $scope.updateThingSummary = function(){};
 $scope.updateThingTaxonomy = function(){};

 $scope.deleteResource = function(){};
 $scope.createResource = function(){};
 $scope.updateResource = function(){};
 $scope.findResource = function(){};


 */