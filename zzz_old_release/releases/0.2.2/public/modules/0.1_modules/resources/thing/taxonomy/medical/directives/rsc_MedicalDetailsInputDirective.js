(function (angular, app) {
  'use strict';

  app.directive('medicalDetailsInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/medical/" + filePaths.templates_subdir + "rsc_MedicalDetailsInputTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);

