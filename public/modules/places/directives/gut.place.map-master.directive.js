(function (angular, _) {
  'use strict';
  gut.time.schedule-confirmed.client.directive.js
  angular.module('places')
    .directive('mapMaster', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'rsc_MapMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: 'PlacesController'
      };
    }]);
})(window.angular, window._);


