/**
 * @class User (Factory):
 * Returns an object containing all the Novantas Users, 
   in the SQL Server ui.Users table
 *
 * Private
 * --------
 * @field user factory:  Returned object
 * @field current:  Currently logged in User
 * @field afterLoadEventKey : Trigger for reloading the Users from the server
 *                            and updating the factory
 * @method initialize : Initializes the user factory
 *
 * Public
 * --------
 *
 * @method onLoad(handler):
 * @field current:  Current logged in User
 * @method $login: Logs in user by routing through $api REST call
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Defines callback used by $api on Login event
*       Handler for initializing factory on login
 * $api.onLogout(): Defines callback used by $api on Logout event
*       Handler for erasing factory on logout
 *
 */
(function (angular, app, _) {

  'use strict';

  app.factory('$user', ['$log', '$debug', '$api',
        function ($log, $debug, $api) {
          var userFactory,
              current = null,
              afterLoadEventKey = '$user.afterLoad',
              initialize = function $userInitialize(state) {
                current = new User(_.extend(state.jasperSession, state.userInfo));
                
                _.trigger(afterLoadEventKey, userFactory);

                $log.debug('$user Initialized', current);
                return userFactory;
              };
          /**
           * Class User:
           * Object representing a User from ui.Users table
           *
           * @field data:
           * @field fullName:  Name of User
           * @field credential:
           */

          function User(data) {
            $log.debug('new User', data);
            this.data = data || {};
          }

          User.prototype = Object.create(Object.prototype, {
            fullName: {
              enumerable: true,
              get: function getFullName() {
                return [this.data.firstName, this.data.lastName].join(' ') || this.data.user.username;
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