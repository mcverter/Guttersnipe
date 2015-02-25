  (function (angular, _) { 'use strict';

  angular.module('things')
      .directive('resourceSummaryInput', ['things_templates', function(templates) {
      var templateUrl = templates.summary + 'rsc_SummaryInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
//          controller: 'ThingsSummaryController'
      }
    }]
  );

