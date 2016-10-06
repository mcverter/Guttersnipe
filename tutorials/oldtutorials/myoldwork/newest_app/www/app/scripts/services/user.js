(function (angular, app, _) {

  'use strict';

  app.factory('$user', ['$log', '$debug', '$api',
        function ($log, $debug, $api) {
          var userFactory,
              current = null,
              afterLoadEventKey = '$user.afterLoad',
              initialize = function $userInitialize(state) {
                current = new User(state.jasperSession);

                _.trigger(afterLoadEventKey, userFactory);

                $log.debug('$user Initialized', current);
                return userFactory;
              };

          function User(data) {
            $log.debug('new User', data);
            var self = this;
            self.data = data || {};
          }

          User.prototype = Object.create(Object.prototype, {
            fullName: {
              enumerable: true,
              get: function getFullName() {
                var self = this;
                return self.data.user.fullName;
              }
            },

            credential: {
              enumerable: true,
              get: function getCredential() {
                var self = this;
                return self.data.credential;
              }
            }

          });

          userFactory = Object.create(Object.prototype, {
            onLoad: {
              enumerable: true,
              value: function onLoad(handler) {
                var self = this;

                _.on(afterLoadEventKey, handler);

                if (!_.isEmpty(current)) {
                  handler(self);
                }
              }
            },

            current: {
              enumerable: true,
              get: function getCurrent() {
                return current;
              }
            },

            $login: {
              enumerable: true,
              value: function login(username, password, organization) {
                return $api.$login(username, password, organization);
              }
            }
          });

          $api.onLogin(initialize);
          $api.onLogout(function $navLogoutHandler() {
            current = null;
          });

          $debug.services.$user = userFactory;
          return userFactory;
        }]);

})(window.angular, window.novantas, window._);