(function (angular, _) { 'use strict';

// Users service used for communicating with the users REST endpoint
  angular.module('users').factory('Users', ['$resource',
    function($resource) {
      return $resource('users', {}, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);
})(window.angular, window._)