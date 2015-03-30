(function () {
    'use strict';

    function kropotkinFactory (api) {
        var kropotkinFactory = {
            getRandom: getRandomKropotkin
        }


        function getRandomKropotkin() {
            api.kropotkins.getRandom();
        }

        return kropotkinFactory;
        
    }
    angular.module('kropotkins').factory('Kropotkins', ['api', kropotkinFactory]);
})();
