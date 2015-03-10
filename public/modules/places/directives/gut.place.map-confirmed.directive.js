(function (angular, _) {
  'use strict';

  angular.module('places')
    .directive('mapConfirmed',  ['places_templates', function(templates) {
      var templateUrl = templates.main + 'rsc_MapConfirmedTemplate.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]);})(window.angular, window._);


