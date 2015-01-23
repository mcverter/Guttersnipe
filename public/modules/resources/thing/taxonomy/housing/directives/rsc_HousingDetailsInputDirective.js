(function (angular, app) {
  'use strict';

  app.directive('housingDetailsInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/housing/" + filePaths.templates_subdir + "rsc_HousingDetailsInputTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);

