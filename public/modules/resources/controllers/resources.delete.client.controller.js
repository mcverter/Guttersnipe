(function() {
    'use strict';

    function ResourceDeleteController(Resources, Authentication) {
        var vm = this;

        vm.activate = activate;
        vm.delete = deleteResource;

        vm.resource = {};

        activate();

        function activate() {

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

    }

    angular.module('resources')
        .controller('ResourcesDeleteController',
        ['Resources', 'Authentication', ResourceDeleteController])

})();
