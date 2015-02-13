  'use strict';

  angular.module('things')
      .directive('resourceSummaryConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.summary + 'rsc_SummaryConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
//          controller: 'ThingsSummaryController'
      }
    }]
  );


