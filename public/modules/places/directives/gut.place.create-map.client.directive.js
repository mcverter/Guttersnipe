(function (angular, _) {
  'use strict';

  angular.module('places')
    /* Error: [$compile:tpload] Failed to load template: modules/places/templates/place-map-master.client.template.html*/
    .directive('createMap', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'place.create-map.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: 'PlacesController'
      };
    }]);
})(window.angular, window._);


