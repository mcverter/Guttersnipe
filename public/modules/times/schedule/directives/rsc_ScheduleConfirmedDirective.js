  'use strict';
  angular.module('times')
      .directive('scheduleConfirmed', ['templates', function(templates) {
          var templateUrl = templates.schedule + '/rsc_ScheduleConfirmedWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


