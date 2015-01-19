(function (angular, app) {
  'use strict';

  app.directive('scheduleMaster', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "time/rsc_ScheduleMasterTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


