(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutPlaceFull', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'place-full.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          place: '='
        }
      };
    }]
  );
})(window.angular, window._);

