(function (angular, app) {
  'use strict';

  app.directive('scheduleConfirmed', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "time/" + filePaths.templates_subdir + "rsc_ScheduleConfirmedTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


