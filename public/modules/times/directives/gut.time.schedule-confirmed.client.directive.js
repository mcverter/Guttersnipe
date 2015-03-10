(function (angular, _) { 'use strict';
  angular.module('times')
    .directive('scheduleConfirmed', ['times_templates', function(templates) {
      var templateUrl = templates.main + '/rsc_ScheduleConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

