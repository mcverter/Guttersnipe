(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('foodDetailsConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.food + 'rsc_FoodDetailsConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

