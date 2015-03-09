(function (angular, _) {
  'use strict';
  angular.module('times')
    .directive('resourceSchedule', ['times_templates', function(templates) {
      var templateUrl = 'modules/times/common/templates/rsc_ScheduleTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

