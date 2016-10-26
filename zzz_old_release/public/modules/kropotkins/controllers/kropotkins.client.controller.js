(function () {
    'use strict';

    function KropotkinController (Kropotkins) {
        var vm = this;
        vm.find = findAllKropotkins;
        vm.findOne = findOneKropotkin;


        // Find a list of Kropotkins
        function findAllKropotkins() {
            vm.kropotkins = Kropotkins.query();
        };

        // Find existing Kropotkin
        function findOneKropotkin () {
            vm.kropotkin = Kropotkins.get({
                kropotkinId: $stateParams.kropotkinId
            });
        };
    }

    angular.module('kropotkins').controller('KropotkinsController',
        ['Kropotkins', KropotkinController]);
})();
