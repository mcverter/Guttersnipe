(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutThingFull', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing-full.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

