'use strict';

angular.module('places')
    .directive('mapConfirmed',  ['templates', function(templates) {
          var templateUrl = templates.map + 'rsc_MapConfirmedTemplate.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]);






