(function (angular, app, _, moment) {

  'use strict';

  app.controller('AuthCtrl', ['$scope', '$log', '$debug',
      function ($scope, $log, $debug) {
        Object.defineProperties($scope, {
          submitLogin: {
            enumerable: true,
            value: function submitLogin(loginForm) {
              var self = this;
              self.login(self.credential);
            }
          }
        });
      }
    ]
  );

}) (window.angular, window.novantas, window._, window.moment);