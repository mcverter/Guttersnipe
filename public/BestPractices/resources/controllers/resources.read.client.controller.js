(function() {
    'use strict';

    function ResourceReadController(Resources, Authentication) {
        var vm = this;

        vm.activate = activate;
        vm.readOne = readOneResource;
        vm.readList = readListResources;

        vm.resource = {};
        vm.resources = [];


        activate();

        function activate() {
            vm.resource = Resources.getEmptyResource;
        }


        function readListResources() {
            $scope.resources = Resources.query();
        }

        function readOneResource() {
            Resources.get({
                resourceId: $stateParams.resourceId
            }).$promise.then(function(rsc) {
                    $scope.resource = rsc;
                    $scope.options = {scrollwheel: false};
                    var coordinates = $scope.resource.place.coordinates;

                    $scope.map = {
                        center: {
                            latitude: coordinates.lat,
                            longitude: coordinates.lng
                        },
                        marker : {
                            id: 0,
                            coords: {
                                latitude: coordinates.lat,
                                longitude: coordinates.lng
                            },
                            options: { draggable: false }
                        },
                        zoom: 16
                    }
                });
        }

    }

    angular.module('resources')
        .controller('ResourcesReadController',
        ['Resources', ResourceReadController])

})()
