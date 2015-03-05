(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutThingSmall', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing-small.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

