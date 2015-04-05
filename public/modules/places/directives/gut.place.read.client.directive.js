
(function () {
  'use strict';

    function FullPlaceDirective(templates) {
        var templateUrl = templates.main + 'place-full.client.template.html';

        return {
            restrict: 'E',
            templateUrl: templateUrl,
            scope : {
                place: '='
            }
        };
    }

    function SmallPlaceDirective(templates) {
        var templateUrl = templates.main + 'place-small.client.template.html';

        return {
            scope : {
                place: '='
            },
            restrict: 'E',
            templateUrl: templateUrl
        };
    }


  angular.module('resources')
      .directive('placeFull', ['places_templates', FullPlaceDirective])
      .directive('placeSmall', ['places_templates', SmallPlaceDirective]);
})();

