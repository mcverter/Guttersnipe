(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('resourceSummaryInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.summary-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);


