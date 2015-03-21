(function (angular, _) { 'use strict';

    angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
        function($scope, $stateParams, $location, Authentication, Resources) {
            $scope.resource = Resources.getEmptyResource;

            $scope.Authentication = Authentication;
            $scope.create =  function()
            {
                console.log ('creating resource');
                var resource = new Resources({
                    resource: this.resource
                });
                console.log('resource is', resource);;
                resource.$save(function (response) {
                    $location.path('resources/' + response._id);

                    $scope.resource = {};
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            $scope.remove = function(resource) {
                if (resource) {
                    resource.$remove();

                    for (var i in $scope.resources) {
                        if ($scope.resources[i] === resource) {
                            $scope.resources.splice(i, 1);
                        }
                    }
                } else {
                    $scope.resource.$remove(function() {
                        $location.path('resources');
                    });
                }
            };
            $scope.update = function() {
                var resource = $scope.resource;

                resource.$update(function() {
                    $location.path('resources/' + resource._id);
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            $scope.find = function() {
                $scope.resources = Resources.query();
            };

            $scope.findOne = function() {
                Resources.get({
                    resourceId: $stateParams.resourceId
                }).$promise.then(function(rsc) {
                        $scope.resource = rsc;
                        $scope.options = {scrollwheel: false};
                        var coordinates = $scope.resource.place.coordinates;


                        $scope.map = {
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
            };


            var isCreateValid, isCreateAgreed,
                isCreateSummaryConfirmed, isCreateClassificationConfirmed,
                isCreatePlaceConfirmed, isCreateTimeConfirmed;

            Object.defineProperties($scope, {
                isCreateAgreed : {
                    enumerable: true,
                    get: function() {
                        return isCreateAgreed;
                    },
                    set: function(val) {
                        isCreateAgreed = val;
                    }
                },
                isCreateValid : {
                    enumerable: true,
                    get: function() {
                        return isCreateValid;
                    },
                    set: function(val) {
                        isCreateValid = val;
                    }
                },
                isCreatePlaceConfirmed : {
                    enumerable: true,
                    get: function() {
                        return isCreatePlaceConfirmed;
                    },
                    set: function(val) {
                        isCreatePlaceConfirmed = val;
                    }
                },
                isCreateTimeConfirmed : {
                    enumerable: true,
                    get: function() {
                        return isCreateTimeConfirmed;
                    },
                    set: function(val) {
                        isCreateTimeConfirmed = val;
                    }
                },
                isCreateSummaryConfirmed : {
                    enumerable: true,
                    get: function() {
                        return isCreateSummaryConfirmed;
                    },
                    set: function(val) {
                        isCreateSummaryConfirmed = val;
                    }
                },
                isCreateClassificationConfirmed : {
                    enumerable: true,
                    get: function() {
                        return isCreateClassificationConfirmed;
                    },
                    set: function(val) {
                        isCreateClassificationConfirmed = val;
                    }
                },



                addTime : {enumerable: true, value: function(){}},
                addPlace : {enumerable: true, value: function(){}},
                addThingSummary : {enumerable: true, value: function(){}},
                addThingTaxonomy : {enumerable: true, value: function(){}},

                updateTime : {enumerable: true, value: function(){}},
                updatePlace : {enumerable: true, value: function(){}},
                updateThingSummary : {enumerable: true, value: function(){}},
                updateThingTaxonomy : {enumerable: true, value: function(){}},

                deleteResource : {enumerable: true, value: function(){}},
                createResource : {enumerable: true, value: function(){}},
                updateResource : {enumerable: true, value: function(){}},

                findResource : {enumerable: true, value: function(){}}
            });


            console.log('resources scope', $scope);
        }
    ]);
})(window.angular, window._);


/*
 $scope.addTime = function(){};
 $scope.addPlace = function(){};
 $scope.addThingSummary = function(){};
 $scope.addThingTaxonomy = function(){};

 $scope.updateTime = function(){};
 $scope.updatePlace = function(){};
 $scope.updateThingSummary = function(){};
 $scope.updateThingTaxonomy = function(){};

 $scope.deleteResource = function(){};
 $scope.createResource = function(){};
 $scope.updateResource = function(){};
 $scope.findResource = function(){};


 */
