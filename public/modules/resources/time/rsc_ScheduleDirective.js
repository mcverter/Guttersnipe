(function (angular, app) {
  'use strict';

  app.directive('resourceSchedule', ['filePaths', function(filePaths) {
      console.log('in resource schedule directive');
      var templateUrl = filePaths.resources_create_wizard + 'rsc_ScheduleWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


