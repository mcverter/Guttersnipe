
(function () {
    'use strict';

//Resources service used for communicating with the resources REST endpoints
    angular.module('resources').factory('Resources',
        ['$resource', 'Places', 'Times', 'Things',
            function($resource, Places, Times, Things) {
                var resources = [],
                    resourcesService  = {
                        getOneResource: getOneResource,
                        getAllResources: getAllResources,
                        getEmptyResource : getEmptyResource
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


                function getSingleResource() {

                }
                function getResourceList() {

                }

                var retval = $resource(
                    'resources/:resourceId',
                    {
                        resourceId: '@_id'
                    },
                    {
                        query: {
                            isArray: true,
                            method: 'GET',
                            transformResponse: transformResponseList
                        },
                        get: {
                            method: 'GET',
                            transformResponse: transformResponseSingle
                        },
                        update: {
                            method: 'PUT'
                        }
                    });

                Object.defineProperties(retval, {
                    getEmptyResource : {
                        enumerable: true,
                        value: getEmptyResource()

                    }
                });

                return retval;
            }
        ]);
})();


