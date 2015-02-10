'use strict';

angular.module('places')
    .directive('mapMaster', ['TEMPLATE_DIR', function(TEMPLATE_DIR) {
          var templateUrl  = TEMPLATE_DIR + 'rsc_MapMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]);


