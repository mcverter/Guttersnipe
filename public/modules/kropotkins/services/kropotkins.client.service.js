(function () {
    'use strict';

    function kropotkinFactory (Api) {
        var kropotkinFactory = {
            getRandom: getRandomKropotkin
        };


        function getRandomKropotkin() {
            return Api.kropotkins.getRandom();
        }


        return kropotkinFactory;
        
    }
    angular.module('kropotkins').factory('Kropotkins', ['Api', kropotkinFactory]);
})();
