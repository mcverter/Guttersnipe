
(function () {
    'use strict';

    function resourcesService (Api, Places, Times, Things) {
        var resources = [],
            resourcesService  = {
                getOneResource: getOneResource,
                getAllResources: getAllResources,
                getEmptyResource : getEmptyResource,
                deleteResource: deleteResource,
                createResource: createResource,
                updateResource: updateResource
            };

        function deleteResource(resource) {

        }
        function createResource(resource) {

        }
        
        function updateResource(resource) {

        }



        function getAllResources() {
            return Api.resources.getAll()
                .then(function(data){
                    console.log( "data is ", data);
                    return data;
                })
                .catch(function(err){
                    console.log('error in resources.getAllResources', err);
                })
        }

        function getOneResource(resourceId) {
            var rsc = _.find(resources, {id: resourceId});
            if (!rsc) {

            }
            return rsc;
        }

        function getEmptyResource() {
            var ret = {};
            ret.thing = Things.emptyThing;
            ret.place = Places.emptyPlace;
            ret.time = Times.emptyTime;
            return ret;
        }

        return resourcesService;
    }

    angular.module('resources').factory('Resources',
        ['Api', 'Places', 'Times', 'Things', resourcesService]);

})();


