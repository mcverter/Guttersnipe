(function (angular, _) {
  'use strict';

// Setting up route
  angular.module('users').config(['$stateProvider',
    function($stateProvider) {
      // Users state routing
      $stateProvider.
        state('profile', {
          url: '/settings/profile',
          templateUrl: 'modules/users/templates/settings/edit-profile.client.view.html'
        }).
        state('password', {
          url: '/settings/password',
          templateUrl: 'modules/users/templates/settings/change-password.client.view.html'
        }).
        state('accounts', {
          url: '/settings/accounts',
          templateUrl: 'modules/users/templates/settings/social-accounts.client.view.html'
        }).
        state('signup', {
          url: '/signup',
          templateUrl: 'modules/users/templates/authentication/signup.client.view.html'
        }).
        state('signin', {
          url: '/signin',
          templateUrl: 'modules/users/templates/authentication/signin.client.view.html'
        }).
        state('forgot', {
          url: '/password/forgot',
          templateUrl: 'modules/users/templates/password/forgot-password.client.view.html'
        }).
        state('reset-invalid', {
          url: '/password/reset/invalid',
          templateUrl: 'modules/users/templates/password/reset-password-invalid.client.view.html'
        }).
        state('reset-success', {
          url: '/password/reset/success',
          templateUrl: 'modules/users/templates/password/reset-password-success.client.view.html'
        }).
        state('reset', {
          url: '/password/reset/:token',
          templateUrl: 'modules/users/templates/password/reset-password.client.view.html'
        });
    }
  ]);
})(window.angular, window._)