(function() {
    'use strict';

    function ResourcesController(Resources, $stateParams, $location, Authentication){
        var vm = this;

        vm.activate = activate;
        vm.resource = {};
        vm.resources = [];
        vm.resource.eventSources = [];
        vm.Authentication = Authentication;
        vm.create =  createResource;
        vm.remove = deleteResource;
        vm.update = updateResource;
        vm.find = findAllResources;
        vm.findOne = findOneResource;
        vm.isCreateAgreed  = false;
        vm.isCreateValid = false;
        vm.isCreatePlaceConfirmed = false;
        vm.isCreateTimeConfirmed = false;
        vm.isCreateSummaryConfirmed = false;
        vm.isCreateClassificationConfirmed = false;
        vm.addTime  = function(){};
        vm.addPlace  = function(){};
        vm.addThingSummary  = function(){};
        vm.addThingTaxonomy  = function(){};
        vm.updateTime  = function(){};
        vm.updatePlace  = function(){};
        vm.updateThingSummary  = function(){};
        vm.updateThingTaxonomy  = function(){};

        activate();

        function activate(){
            vm.resources = [];
            vm.resource = Resources.getEmptyResource;
        }


/*        function getAvengers() {
            return dataservice.getAvengers().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }



        function activate() {
            return getAvengers().then(function() {
                logger.info('Activated Avengers View');
            });
        }

*/
        function createResource() {
            var resource = new Resources({
                resource: this.resource
            });
            resource.$save(function (response) {
                $location.path('resources/' + response._id);

                $scope.resource = {};
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        }


        function deleteResource (resource) {
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
        }


        function updateResource() {
            var resource = $scope.resource;

            resource.$update(function() {
                $location.path('resources/' + resource._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        }

        function findAllResources() {
            $scope.resources = Resources.query();
        }

        function findOneResource() {
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
        }
    }
    ResourcesController.$inject = ['Resources','$stateParams', '$location', 'Authentication'];
})()
