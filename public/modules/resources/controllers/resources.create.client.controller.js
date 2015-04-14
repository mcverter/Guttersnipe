
(function() {
    'use strict';

    function ResourceCreateController($scope, Resources, $location, $anchorScroll, Authentication) {
        $scope.activate = activate;
        $scope.create = createResource;

        $scope.resource = {};

        $scope.scrollTo = scrollTo;

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

        function isCreateFormConfirmed() {
            return  $scope.confirmations.isCreatePlaceConfirmed &&
                $scope.confirmations.isCreateTimeConfirmed &&
                $scope.confirmations.isCreateDescriptionConfirmed &&
                $scope.confirmations.isCreateClassificationConfirmed;
        }

        function scrollTo(id) {
            $location.hash(id);
            $anchorScroll();
        }

        function createResource() {

            if (isCreateFormConfirmed()) {
                Resources.createResource($scope.resource)
                    .then(function (data) {
                        console.log('Returned data', data)
                    })
                    .catch(function (err) {
                        console.err('got error', err);
                    });
            }
            else {
                $scope.showPlaceConfirmError =  ! $scope.confirmations.isCreatePlaceConfirmed;
                $scope.showTimeConfirmError =   ! $scope.confirmations.isCreateTimeConfirmed;
                $scope.showDescriptionConfirmError =  ! $scope.confirmations.isCreateDescriptionConfirmed;
                $scope.showClassificationConfirmError =  ! $scope.confirmations.isCreateClassificationConfirmed;
            }
        }

    }



    /*
     Resource is {"thing":{"description":{"summary":"It's a very miserable place","notes":"Cry all the time","headline":"Mitchell's House","method":"Go there and beg"},"taxonomy":{"type":"food","subtypes":["Food Not Bombs","Free Communal Meal"]},"details":["moose"]},"place":{"coordinates":{"lat":40.758895,"lng":-73.98513100000002},"name":"","address":"Times Square, Manhattan, NY 10036, USA","notes":"moo","description":"describer"},"time":{"schedules":[{"repeating":false,"id":1,"allDay":false,"start":"2015-04-07T12:00:00.000Z","end":"2015-04-07T12:30:00.000Z","__uiCalId":1,"_id":"1","_start":"2015-04-07T12:00:00.000Z","_end":"2015-04-07T12:30:00.000Z","className":[]}],"notes":""}}
     */

    angular.module('resources')
        .controller('ResourcesCreateController',
        ['$scope', 'Resources', '$location', '$anchorScroll', 'Authentication', ResourceCreateController])

})();
