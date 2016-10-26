(function (angular, _) {
  'use strict';

  angular.module('things').directive('housingDetailsConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.main  + 'gut.thing.housing-confirmed.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);



