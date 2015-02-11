'use strict';

angular.module('places')
    .directive('mapMaster', ['templates', function(templates) {
        var templateUrl = templates.map + 'rsc_MapMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]);


