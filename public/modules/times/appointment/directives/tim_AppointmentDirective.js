  (function (angular, _) { 'use strict';

  angular.module('times').directive('appointment', ['times_templates', function(templates) {
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


