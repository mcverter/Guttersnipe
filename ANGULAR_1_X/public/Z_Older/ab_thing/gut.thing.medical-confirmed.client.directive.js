(function (angular, _) {
  'use strict';

  angular.module('things').directive('medicalDetailsConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.medical-confirmed.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

