(function() {
    'use strict';

    function ResourceReadController(Resources, Things, Places, Times) {
        var vm = this;
        //vm.readOne = readOneResource;
        vm.resources = [];
        vm.showMap = false;

        activate();

//        roadrunneratwast: in your controller:  mainview.dirval = []; $http.foo(…).then(function(response) { angular.copy(response.data, mainview.dirval); })
        function activate() {
            vm.calendar = {repeating: [], nonRepeating: []};
            Resources.getAllResources()
                .then(function(data) {
                    vm.resources = data;
                    vm.map = Places.createMapFromResources(data);
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
