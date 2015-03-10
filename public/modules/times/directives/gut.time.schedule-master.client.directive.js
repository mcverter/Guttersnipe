(function (angular, _) {
  'use strict';
  angular.module('times')
    .directive('scheduleMaster', ['times_templates', function(templates) {
      var templateUrl = templates.main + 'gut.time.schedule-master.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: 'TimesController'
      };
    }]
  );
})(window.angular, window._);

