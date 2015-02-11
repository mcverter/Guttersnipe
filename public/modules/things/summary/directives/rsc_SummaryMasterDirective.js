  'use strict';

  angular.module('things')
      .directive('resourceSummary', ['templates', function(templates) {
      var templateUrl = 'modules/things/summary/templates/rsc_SummaryMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


