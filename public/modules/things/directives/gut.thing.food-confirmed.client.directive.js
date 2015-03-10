(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('foodDetailsConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.main  + 'gut.thing.food-confirmed.client.template.html';;

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

