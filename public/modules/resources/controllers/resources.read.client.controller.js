(function() {
    'use strict';

    function ResourceReadController(Resources, Authentication) {
        var vm = this;
        vm.readOne = readOneResource;
        vm.readList = readListResources;

        vm.resource = {};
        vm.resources = [];


        activate();

        function activate() {
            Resources.getAllResources()
                .then(function(data) {
                    vm.resources = data;
                });
        }


        function readListResources() {
            vm.resources = Resources.query();
        }

        function readOneResource() {
            Resources.get({
                resourceId: $stateParams.resourceId
            }).$promise.then(function(rsc) {
                    vm.resource = rsc;
                    vm.options = {scrollwheel: false};
                    var coordinates = vm.resource.place.coordinates;

                    vm.map = {
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
