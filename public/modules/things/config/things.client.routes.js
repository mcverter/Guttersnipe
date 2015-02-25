(function (angular, _) {
  'use strict';

//Setting up route
  angular.module('things').config(['$stateProvider',
    function($stateProvider) {
      // Things state routing
      $stateProvider.
        state('listThings', {
          url: '/things',
          templateUrl: 'modules/things/views/list-things.client.view.html'
        }).
        state('createThing', {
          url: '/things/create',
          templateUrl: 'modules/things/views/create-thing.client.view.html'
        }).
        state('viewThing', {
          url: '/things/:thingId',
          templateUrl: 'modules/things/views/view-thing.client.view.html'
        }).
        state('editThing', {
          url: '/things/:thingId/edit',
          templateUrl: 'modules/things/views/edit-thing.client.view.html'
        });
    }
  ]);
})(window.angular, window._);