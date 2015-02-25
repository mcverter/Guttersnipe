(function (angular, _) {
  'use strict';
  angular.module('times')
    .directive('scheduleMaster', ['times_templates', function(templates) {
      var templateUrl = templates.schedule + 'rsc_ScheduleMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: 'TimesController'
      }
    }]
  );
})(window.angular, window._);

