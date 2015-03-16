(function (angular, _) {
  'use strict';

  angular.module('places')
    /* Error: [$compile:tpload] Failed to load template: modules/places/templates/place-map-master.client.template.html*/
    .directive('createMap', ['places_templates', 'Places',
      function(templates, Places) {
        var templateUrl = templates.main + 'place.create-map.client.template.html';

        return {
          restrict: 'E',
          scope : {
            place: '='
          },
          templateUrl: templateUrl,
          controller: function($scope) {
            var coordinates = Places.prospectPark.coordinates;
            $scope.map = {
              center: {
                latitude: coordinates.lat,
                longitude: coordinates.lng
              },
              marker : {
                id: 1,
                options : {
                  draggable: false
                },
                events: {}
              },
              zoom: Places.defaultZoom,
              options: {}
            }
          }
      };
}]);
})(window.angular, window._);


