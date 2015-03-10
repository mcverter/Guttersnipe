(function (angular, _) { 'use strict';
  angular.module('times')
    .directive('scheduleConfirmed', ['times_templates', function(templates) {
      var templateUrl = templates.main + 'gut.time.schedule-confirmed.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

