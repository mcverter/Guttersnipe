(function() {
  'use strict';

  function ResourceReadOneController($scope, $stateParams, Resources, Authentication) {
    $scope.resource = [];
    $scope.showMap = false;
    $scope.rating = 0;
    $scope.maxRating = 10;
    $scope.authentication = Authentication;
    $scope.addComment = addComment;
    $scope.addRating = addRating;

    activate();

    function addComment(text){
      console.log('adding comment')
      Resources.addComment($scope.resource._id, $scope.authentication.user._id, text);
    }

    function addRating(value) {
      Resources.addRating($scope.resource._id, value);
    }

    function activate() {
      Resources.getOneResource($stateParams.resourceId)
        .then(function(rsc) {
          $scope.resource = rsc;
          console.log('resource', $scope.resource);
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
    }

  }

  angular.module('resources')
    .controller('ResourcesReadOneController',
    ['$scope', '$stateParams', 'Resources', 'Authentication', ResourceReadOneController])

})();
