  'use strict';

  angular.module('things')
      .directive('resourceSummary', ['things_templates', function(templates) {
      var templateUrl = templates.summary + 'rsc_SummaryMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
          controller: 'ThingsSummaryController'
      }
    }]
  );


