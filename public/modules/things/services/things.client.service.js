(function () {
    'use strict';

    function ThingService() {
        var thingFactory = {
            emptyThing : getEmptyThing
        };

        function getEmptyThing() {
            return {
                description: {
                    summary: '',
                    notes: '',
                    headline: '',
                    method: ''
                },
                taxonomy: {
                    type: '',
                    subtypes: []
                },
                details: []
            }
        }


        return thingFactory;
    }
    angular.module('things').factory('Things', [ThingService]);
})();

