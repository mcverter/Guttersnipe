(function (angular, _) {
  'use strict';

  angular.module('resources').directive('detail', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.detail.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '=',
          value: '='
        }
      };
    }]
  )
    .directive('detailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.details-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '=',
          value: '='
        }
      };
    }]
  )
    .directive('detailsResult', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.details-result.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '=',
          value: '='
        }
      };
    }]
  );
})(window.angular, window._);

