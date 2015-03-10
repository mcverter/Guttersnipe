(function (angular, _) {
  'use strict';

  angular.module('things').directive('housingDetailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.main  + 'gut.thing.housing-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);



