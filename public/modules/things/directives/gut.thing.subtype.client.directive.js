(function (angular, _) {
  'use strict';

  angular.module('resources').directive('subtype', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtype.client.template.html';

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
    .directive('subtypesInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtypes-input.client.template.html';

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
    .directive('subtypesResult', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtypes-result.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
          thing: '=',
          value: '='
        }
      }
    }])
  ;
})(window.angular, window._);

