  'use strict';

  angular.module('times')
      .directive('resourceSummaryConfirmed', ['templates', function(templates) {
      var templateUrl = 'modules/things/summary/templates/rsc_SummaryConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


