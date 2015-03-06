(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutPlaceFull', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'place-full.client.template.html';

      return {
        scope : {
          place: '='
        },
        restrict: 'E',
        templateUrl: templateUrl,
        controller: function($scope) {
        },
        link: function(scope, el, attrs) {

        }
      }
    }]
  );
})(window.angular, window._);

