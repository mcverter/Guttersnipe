  'use strict';
  angular.module('times')
      .directive('scheduleConfirmed', ['times_templates', function(templates) {
          var templateUrl = templates.schedule + '/rsc_ScheduleConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


