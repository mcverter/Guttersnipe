(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutPlaceSmall', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'place-small.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

