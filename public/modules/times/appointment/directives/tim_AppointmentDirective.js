  'use strict';

  angular.module('times').directive('appointment', ['templates', function(templates) {
      var templateUrl = 'modules/times/appointment/templates/tim_AppointmentTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          scheduleType: '='
        }
      }
    }]
  );


