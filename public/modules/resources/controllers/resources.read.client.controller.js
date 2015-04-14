(function() {
    'use strict';

    function ResourceReadController(Resources, Things, Places, Times) {
        var vm = this;
        vm.readOne = readOneResource;
        vm.resources = [];
        vm.showMap = false;

        activate();

        function activate() {
            Resources.getAllResources()
                .then(function(data) {
//                    data = Times.transformAllTimes(data);
                    vm.resources = data;
                    vm.map = Places.createMapFromResources(data);
                console.log('vm map is' , vm.map);
                    vm.calendar = Times.createCalendarFromResources(data);
                });
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
        ['Resources', 'Things', 'Places', 'Times', ResourceReadController])

})();
