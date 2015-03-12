(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('resourceCreateSummary', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.create-summary.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '=',
          headline: '='
        }
      };
    }]
  );
})(window.angular,  window._);



