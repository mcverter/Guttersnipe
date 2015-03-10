(function (angular, _) {
  'use strict';

  angular.module('things').directive('medicalDetailsMaster', ['things_templates', function(templates) {
      var templateUrl = templates.medical + 'rsc_MedicalDetailsMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

