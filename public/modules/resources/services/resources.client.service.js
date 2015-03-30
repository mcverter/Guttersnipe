
(function () {
    'use strict';

    function resourcesService ($resource, Places, Times, Things) {
        var resources = [],
            resourcesService  = {
                getOneResource: getOneResource,
                getAllResources: getAllResources,
                getEmptyResource : getEmptyResource,
                deleteResource: deleteResource,
                createResource: createResource,
                updateResource: updateResource
            };


        function getAllResources() {
            return $http({
                method: 'GET',
                url: 'resources/',
                transformResponse: transformResponseList
            })
                .then(function(response) {
                    resources = response.data;
                    return resources;
                })
                .catch(function(response) {

                    return $q.reject('Error retrieving resources. HTTP status: '
                    + response.status + '.  Got data: ' + response.data);
                })
        }

        function getOneResource(resourceId) {
            var rsc = _.find(resources, {id: resourceId});
            return rsc;
        }

        function getEmptyResource() {
            var ret = {};
            ret.thing = Things.emptyThing;
            ret.place = Places.emptyPlace;
            ret.time = Times.emptyTime;
            return ret;
        }
        var transformResponseList = function(data){
            data = angular.fromJson(data);
            _.forEach(data, function(rsc){
                transformSchedules(rsc.time.schedules);
            });
            return data;
        };

        var transformResponseSingle = function(data, headers) {
            data = angular.fromJson(data);
            transformSchedules(data.time.schedules);
            return data;
        };

        return resourcesService;
    }

    angular.module('resources').factory('Resources',
        ['$resource', 'Places', 'Times', 'Things', resourcesService]);

})();


