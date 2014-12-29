(function (angular, app) {
  'use strict';

  app.directive('scheduleRecurring', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'time/recurring/rsc_WeeklyRecurringWidget.html',
        controller = function($scope) {
          $scope.recurringConfig = {
            calendar:{
              height: 450,
              editable: true,
              header:{
                center: 'title',
                right: 'today prev,next'
              },
              defaultView: 'agendaWeek',
              dayClick: $scope.alertEventOnClick,
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize
            }
          }
        };

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: controller
      }
    }]
  );
})(window.angular, window.guttersnipe);


