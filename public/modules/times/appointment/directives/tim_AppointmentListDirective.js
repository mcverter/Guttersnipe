  'use strict';

  angular.module('times')
      .directive('appointmentList', ['templates', function(templates) {
      var templateUrl = 'modules/times/appointment/templates/tim_AppointmentTemplate.html',
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


