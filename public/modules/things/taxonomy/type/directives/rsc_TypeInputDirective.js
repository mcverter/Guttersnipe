  'use strict';

  angular.module('things').directive('resourceTypeInput', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/type/templates/rsc_TypeInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


