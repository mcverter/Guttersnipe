
(function (angular, app) {
  'use strict';

  app.directive('appointmentList', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "time/appointment/tim_AppointmentTemplate.html",
        controller = function($scope) {

        };

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          appointments: '='
        },
        controller: controller
      }
    }]
  );
})(window.angular, window.guttersnipe);


