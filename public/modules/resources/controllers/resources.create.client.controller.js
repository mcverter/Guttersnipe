(function() {
    'use strict';

    function ResourceCreateController(Resources, Authentication) {
        var vm = this;

        vm.activate = activate;
        vm.create = createResource;

        vm.resource = {};

        vm.isCreateAgreed  = false;
        vm.isCreateValid = false;
        vm.isCreatePlaceConfirmed = false;
        vm.isCreateTimeConfirmed = false;
        vm.isCreateSummaryConfirmed = false;
        vm.isCreateClassificationConfirmed = false;

        activate();

        function activate() {
            vm.resource = Resources.getEmptyResource;
        }

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

    }

    angular.module('resources')
        .controller('ResourcesCreateController',
    ['Resources', 'Authentication', ResourceCreateController])

})()
