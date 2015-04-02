
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
      .directive('gutPlaceFull', ['places_templates', FullPlaceDirective])
      .directive('gutPlaceSmall', ['places_templates', SmallPlaceDirective]);
})();

