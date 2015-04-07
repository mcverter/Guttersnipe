
(function() {
    'use strict';

    function ResourceCreateController($scope, Resources, Authentication) {
        $scope.activate = activate;
        $scope.create = createResource;

        $scope.resource = {};

        $scope.isCreateFormComplete = isCreateFormComplete;

        $scope.confirmations = {
            isCreatePlaceConfirmed : false,
            isCreateTimeConfirmed : false,
            isCreateDescriptionConfirmed : false,
            isCreateClassificationConfirmed : false
        };

        activate();

        function activate() {
            $scope.resource = Resources.getEmptyResource();
            console.log('resource is', $scope.resource);
        }

        function isCreateFormComplete() {
            return  $scope.confirmations.isCreatePlaceConfirmed &&
                $scope.confirmations.isCreateTimeConfirmed &&
                $scope.confirmations.isCreateDescriptionConfirmed &&
                $scope.confirmations.isCreateClassificationConfirmed;
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
        ['$scope', 'Resources', 'Authentication', ResourceCreateController])

})();
