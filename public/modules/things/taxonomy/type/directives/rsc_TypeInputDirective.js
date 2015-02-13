  'use strict';

  angular.module('things').directive('resourceTypeInput', ['things_templates', function(templates) {
      var templateUrl = templates.type + 'rsc_TypeInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


