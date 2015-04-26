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
      Resources.addComment($scope.resource._id, $scope.authentication.user._id, text);
    }

    function addRating(value) {
      Resources.addRating($scope.resource._id, value);
    }

    function activate() {
      Resources.getOneResource($stateParams.resourceId)
        .then(function(rsc) {
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

               console.log('scope', $scope);
        });
    }

  }

  angular.module('resources')
    .controller('ResourcesReadOneController',
    ['$scope', '$stateParams', 'Resources', 'Authentication', ResourceReadOneController])

})();
