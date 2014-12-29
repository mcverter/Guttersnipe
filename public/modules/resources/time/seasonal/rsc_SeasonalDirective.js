(function (angular, app) {
  'use strict';

  app.directive('scheduleSeasonal', ['filePaths', function(filePaths) {
      console.log('in seasonal directive');
      var templateUrl = filePaths.resources_dir + 'time/seasonal/rsc_SeasonalWidget.html',
        controller = function($scope) {
          $scope.seasonalConfig = {
            calendar:{
              height: 450,
              editable: true,
              header:{
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
              },
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


