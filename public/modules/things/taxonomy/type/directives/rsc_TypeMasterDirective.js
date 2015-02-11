  'use strict';
  angular.module('things').directive('resourceType', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/type/templates/rsc_TypeMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


