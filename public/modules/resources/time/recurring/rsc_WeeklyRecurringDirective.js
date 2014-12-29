(function (angular, app) {
  'use strict';

  app.directive('scheduleRecurring', ['filePaths', function(filePaths) {
      console.log('in recurring directive');
      var templateUrl = filePaths.resources_dir + 'time/recurring/rsc_WeeklyRecurringWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


