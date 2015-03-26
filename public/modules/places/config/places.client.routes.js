(function () {
  'use strict';

//Setting up route
  angular.module('places')
    .config(['$stateProvider',
      function($stateProvider) {
        // Places state routing
        $stateProvider.
          state('listPlaces', {
            url: '/places',
            templateUrl: 'modules/places/templates/list-places.client.view.html'
          }).
          state('createPlace', {
            url: '/places/create',
            templateUrl: 'modules/places/templates/create-place.client.view.html'
          }).
          state('viewPlace', {
            url: '/places/:placeId',
            templateUrl: 'modules/places/templates/view-place.client.view.html'
          }).
          state('editPlace', {
            url: '/places/:placeId/edit',
            templateUrl: 'modules/places/templates/edit-place.client.view.html'
          });
      }
    ]);
})();
