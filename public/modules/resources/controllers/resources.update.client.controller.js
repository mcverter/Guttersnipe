(function() {
    'use strict';

    function ResourcesUpdateController(Resources, Authentication) {
        var vm = this;

        vm.activate = activate;
        vm.update = updateResource;

        vm.updateTime = function () {
        };
        vm.updatePlace = function () {
        };
        vm.updateThingSummary = function () {
        };
        vm.updateThingTaxonomy = function () {
        };

        activate();

        function activate() {
            vm.resources = [];
            vm.resource = Resources.getEmptyResource;
        }


        function updateResource() {
            var resource = $scope.resource;

            resource.$update(function () {
                $location.path('resources/' + resource._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        }
    }

    angular.module('resources')
        .controller('ResourcesUpdateController',
        ['Resources', 'Authentication', ResourcesUpdateController])

})();
