(function () {
  'use strict';

  function MapMultipleResourcesController($scope) {
      console.log($scope.map);
  }


  angular.module('places')
    .directive('resourcesMap', ['places_templates', function(templates) {
      var templateUrl = templates.main + 'resources-map.client.template.html';

      return {
        scope : {
          map: '='
        },
        restrict: 'E',
        templateUrl: templateUrl,
        controller:  MapMultipleResourcesController
      };
    }]
  );
})();

