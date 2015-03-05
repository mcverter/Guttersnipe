(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutTimeSmall', ['times_templates', function(templates) {
      var templateUrl = templates.main + 'time-small.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

