(function() {
    'use strict';

    function ResourceReadController(Resources, Things, Places, Times) {
        var vm = this;
        //vm.readOne = readOneResource;
        vm.resources = [];
        vm.showMap = false;

        activate();

        function activate() {
            vm.calendar = {repeating: [], nonRepeating: []};
            Resources.getAllResources()
                .then(function(data) {
                    vm.resources = data;
                    vm.map = Places.createMapFromResources(data);
                   vm.calendar = Times.createCalendarFromResources(data);
                });
        }
    }

    angular.module('resources')
        .controller('ResourcesReadAllController',
        ['Resources', 'Things', 'Places', 'Times', ResourceReadController])

})();
