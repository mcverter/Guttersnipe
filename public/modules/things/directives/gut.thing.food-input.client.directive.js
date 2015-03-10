(function (angular, _) {
  'use strict';

  angular.module('things').directive('foodDetailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.main  + 'gut.thing.food-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

