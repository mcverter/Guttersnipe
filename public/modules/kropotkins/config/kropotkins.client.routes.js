(function () {
  'use strict';

//Setting up route
  angular.module('kropotkins').config(['$stateProvider',
    function($stateProvider) {
      // Kropotkins state routing
      $stateProvider.
        state('listKropotkins', {
          url: '/kropotkins',
          templateUrl: 'modules/kropotkins/templates/list-kropotkins.client.view.html'
        }).
        state('createKropotkin', {
          url: '/kropotkins/create',
          templateUrl: 'modules/kropotkins/templates/create-kropotkin.client.view.html'
        }).
        state('viewKropotkin', {
          url: '/kropotkins/:kropotkinId',
          templateUrl: 'modules/kropotkins/templates/view-kropotkin.client.view.html'
        }).
        state('editKropotkin', {
          url: '/kropotkins/:kropotkinId/edit',
          templateUrl: 'modules/kropotkins/templates/edit-kropotkin.client.view.html'
        });
    }
  ]);
})();
