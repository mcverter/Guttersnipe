(function (angular, app) {
  'use strict';

  app.directive('resourceSummaryConfirmed', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/summary/" + filePaths.templates_subdir + "rsc_SummaryConfirmedTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


