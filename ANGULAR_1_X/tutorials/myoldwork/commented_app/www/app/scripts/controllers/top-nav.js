/**
* @class TopNavCtrl (Controller):
*   Puts data on scope for Navigation Bar on top
*/
(function (angular, app) {
  'use strict';
  app.controller('TopNavCtrl', ['$scope', '$log', '$nav', '$user',
    function ($scope, $log, $nav, $user) {
      Object.defineProperties($scope, {

        show: {
          enumerable: true,
          get: function getShow() {
            return !!$user.current;
          }
        },

        top: {
          enumerable: true,
          get: function getTop() {
            return $nav.top;
          }
        }

      });
    }]);
}) (window.angular, window.novantas);