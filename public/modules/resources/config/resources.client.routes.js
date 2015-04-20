(function () {
    'use strict';

//Setting up route
    angular.module('resources').config(['$stateProvider',
        function($stateProvider) {
            // Resources state routing
            $stateProvider.
                state('allResources', {
                    url: '/resources',
                    templateUrl: 'modules/resources/templates/read/all-resources.client.view.html'
                })
                .state('resourcesListed', {
                    templateUrl: 'modules/resources/templates/read/resources-listed.client.view.html'
                })
                .state('resourcesMapped', {
                    templateUrl: 'modules/resources/templates/read/resources-mapped.client.view.html'
                })
                .state('resourcesCalendared', {
                    templateUrl: 'modules/resources/templates/read/resources-calendared.client.view.html'
                }).
                state('createResource', {
                    url: '/resources/create',
                    templateUrl: 'modules/resources/templates/create/create-resource.client.view.html'
                })
                .state('createResource.agreement', {
                    url: '/agreement',
                    templateUrl: 'modules/resources/templates/create/create-resource-agreement.client.view.html'
                })
                .state('createResource.instructions', {
                    url: '/instructions',
                    templateUrl: 'modules/resources/templates/create/create-resource-instructions.client.view.html'
                })
                .state('createResource.singleForm', {
                    url: '/form',
                    templateUrl: 'modules/resources/templates/create/create-resource-singleform.client.view.html'
                })

                .state('createResource.description', {

                })

                .state('createResource.classification', {

                })

                .state('createResource.map', {

                })

                .state('createResource.time', {

                })

                 .state('createResource.confirmation', {
                  })

                .state('viewResource', {
                    url: '/resources/:resourceId',
                    templateUrl: 'modules/resources/templates/read/view-resource.client.view.html'
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
})();
