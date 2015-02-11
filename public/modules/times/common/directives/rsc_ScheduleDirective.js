  'use strict';
  angular.module('times')
      .directive('resourceSchedule', ['templates', function(templates) {
      console.log('in resource schedule directive');
      var templateUrl = 'modules/times/common/templates/rsc_ScheduleTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


