(function (angular, _) {
  'use strict';

  angular.module('things').directive('medicalDetailsMaster', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.medical-master.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

