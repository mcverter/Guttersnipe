(function () {
    'use strict';

    function MapMultipleResourcesController($scope) {
        console.log($scope.map);
        console.log('show map', $scope.showMap);
    }


    angular.module('places')
        .directive('resourcesMap', ['places_templates', function(templates) {
            var templateUrl = templates.main + 'resources-map.client.template.html';

            return {
                scope : {
                    map: '='
                    //,showMap: '='
                },
                restrict: 'E',
                templateUrl: templateUrl,
                controller:  MapMultipleResourcesController
            };
        }]
    );
})();

