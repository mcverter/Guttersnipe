(function (angular, _) {
    'use strict';

//Setting up route
    angular.module('resources').config(['$stateProvider',
        function($stateProvider) {
            // Resources state routing
            $stateProvider.
                state('allResources', {
                    url: '/resources',
                    templateUrl: 'modules/resources/templates/all-resources.client.view.html'
                })
                .state('resourcesListed', {
                    templateUrl: 'modules/resources/templates/resources-listed.client.view.html'
                })
                .state('resourcesMapped', {
                    templateUrl: 'modules/resources/templates/resources-mapped.client.view.html'
                })
                .state('resourcesCalendared', {
                    templateUrl: 'modules/resources/templates/resources-calendared.client.view.html'
                }).
                state('createResource', {
                    url: '/resources/create',
                    templateUrl: 'modules/resources/templates/create-resource.client.view.html'
                }).
                state('viewResource', {
                    url: '/resources/:resourceId',
                    templateUrl: 'modules/resources/templates/view-resource.client.view.html'
                }).
                state('findResource', {
                    url: '/resources/find',
                    templateUrl: 'modules/resources/templates/find-resource.client.view.html'
                }).

                state('editResource', {
                    url: '/resources/:resourceId/edit',
                    templateUrl: 'modules/resources/templates/edit-resource.client.view.html'
                });
        }
    ]);
})(window.angular, window._);
