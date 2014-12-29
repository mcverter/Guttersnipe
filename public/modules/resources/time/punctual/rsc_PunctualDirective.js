(function (angular, app) {
  'use strict';

  app.directive('schedulePunctual', ['filePaths', function(filePaths) {
      console.log('in punctual directive');
      var templateUrl = filePaths.resources_dir + 'time/punctual/rsc_PunctualWidget.html',
        controller = function($scope) {
          $scope.punctualConfig = {
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


