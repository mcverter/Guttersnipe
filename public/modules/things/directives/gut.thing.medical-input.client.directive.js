(function (angular, _) {
  'use strict';

  angular.module('things').directive('medicalDetailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.medical-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

