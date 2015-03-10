(function (angular, _) {
  'use strict';
  angular.module('things')
    .directive('resourceTypeConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.type-confirmed.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);


