(function () {
  'use strict';

//Setting up route
  angular.module('things').config(['$stateProvider',
    function($stateProvider) {
      // Things state routing
      $stateProvider.
        state('listThings', {
          url: '/things',
          templateUrl: 'modules/things/templates/list-things.client.view.html'
        }).
        state('createThing', {
          url: '/things/create',
          templateUrl: 'modules/things/templates/create-thing.client.view.html'
        }).
        state('viewThing', {
          url: '/things/:thingId',
          templateUrl: 'modules/things/templates/view-thing.client.view.html'
        }).
        state('editThing', {
          url: '/things/:thingId/edit',
          templateUrl: 'modules/things/templates/edit-thing.client.view.html'
        });
    }
  ]);
})();
