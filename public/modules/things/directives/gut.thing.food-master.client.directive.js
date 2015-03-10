(function (angular, _) {
  'use strict';

  angular.module('things').directive('foodDetailsMaster', ['things_templates', function(templates) {
      var templateUrl = templates.main  + 'gut.thing.food-master.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

