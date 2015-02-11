  'use strict';
  angular.module('things')
      .directive('resourceTypeConfirmed', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/type/templates/rsc_TypeConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


