(function (angular, app) {
  'use strict';

  app.directive('scheduleMaster', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'time/' + filePaths.templates_subdir + 'rsc_ScheduleMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


