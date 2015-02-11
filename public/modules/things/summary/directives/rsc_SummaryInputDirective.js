  'use strict';

  angular.module('things')
      .directive('resourceSummaryInput', ['templates', function(templates) {
      var templateUrl = 'modules/things/summary/templates/rsc_SummaryInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );

