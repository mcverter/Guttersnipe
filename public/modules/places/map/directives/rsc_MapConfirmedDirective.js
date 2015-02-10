'use strict';

angular.module('places')
    .directive('mapConfirmed',  ['TEMPLATE_DIR', function(TEMPLATE_DIR) {
          var templateUrl = TEMPLATE_DIR + 'rsc_MapConfirmedTemplate.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]);






