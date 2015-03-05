(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutTimeFull', ['times_templates', function(templates) {
      var templateUrl = templates.main + 'time-full.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

