(function (angular, $, _) {

  'use strict';

  angular.module('debug', [])
    .factory('$debug', ['$log', '$window', '$rootScope', '$injector',
      function ($log, $window, $rootScope, $injector) {
        var $debug = {},
          services = {};

        Object.defineProperties($debug, {
          scopes: {
            enumerable: true,
            get: function getScopes() {
              var ngScopeElements = $('.ng-scope'),
                scopes = _(ngScopeElements)
                  .map(function getScope(el) {
                    var ngEl = angular.element(el);
                    return ngEl.scope();
                  })
                  .value();

              return _.union([$rootScope], scopes);
            }
          },

          services: {
            enumerable: true,
            get: function getServices() {
              return services;
            }
          },

          $injector: {
            enumerable: true,
            get: function getInjector() {
              return $injector;
            }
          }
        });

        $window.$debug = $debug;
        return $debug;
      }]);

}) (window.angular, window.jQuery, window._);