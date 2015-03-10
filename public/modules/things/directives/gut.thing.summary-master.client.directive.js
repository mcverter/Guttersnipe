(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('resourceSummary', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.summary-master.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: 'ThingsSummaryController'
      };
    }]
  );
})(window.angular,  window._);



