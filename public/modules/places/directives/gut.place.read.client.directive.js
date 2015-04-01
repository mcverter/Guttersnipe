
(function () {
  'use strict';

  angular.module('resources')
      .directive('gutPlaceFull', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'place-full.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          place: '='
        }
      };
    }]
  )
      .directive('gutPlaceSmall', ['places_templates', function(templates) {
          var templateUrl = templates.main + 'place-small.client.template.html';

          return {
              scope : {
                  place: '='
              },
              restrict: 'E',
              templateUrl: templateUrl
          };
      }]
  );
})();

