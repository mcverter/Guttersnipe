(function (angular, app) {
  'use strict';

  app.directive('resourceMedicalDetails', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/taxonomy/medical/rsc_MedicalDetailsWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


