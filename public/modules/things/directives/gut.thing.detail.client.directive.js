(function (angular, _) {
  'use strict';

  angular.module('resources')
    /*
    .directive('detail', ['things_templates', function(templates) {
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
  */
    .directive('detailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.details-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: function ($scope) {
          Object.defineProperties($scope, {
          })
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
          details: '='
        }
      };
    }]
  )
    .directive('detailsPanel', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.details-panel.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '='
        },
        controller: function($scope) {
        }
      };
    }]
  )
  ;
})(window.angular, window._);

