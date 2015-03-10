(function (angular, _) {
  'use strict';
  angular.module('things')
    .directive('resourceTypeConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.type + 'rsc_TypeConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);


