(function (angular, app, _) {
  'use strict';
  app.controller('UserMenuCtrl', ['$scope', '$log', '$user',
    function ($scope, $log, $user) {
      Object.defineProperties($scope, {

        show: {
          enumerable: true,
          get: function getShow() {
            return !!$user.current;
          }
        },

        fullName: {
          enumerable: true,
          get: function getFullName() {
            return _.maybe($user, 'current.fullName');
          }
        }

      });
    }]);
}) (window.angular, window.novantas, window._);