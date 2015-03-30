/**
 * @class ViewingHistory (Factory):
 * Returns an object containing the ViewingHistory of the logged-in User
 *    stored in the SQL Server ui.ViewingHistory table and modeled by the
 *    Java ViewingHistory object
 *
 * Private
 * --------
 * @field viewingHistoryFactory:  Returned object
 * @field viewingHistory:  List of ViewingHistory
 * @field afterLoadEventKey : Trigger for reloading the ViewingHistory from the server
 *                            and updating the factory
 * @method initialize : Initializes the ViewingHistory factory
 *
 * Public
 * --------
 *
 * @field all:  returns Viewing history factory
 * @method $load:  Returns results of REST request to server
 * @method onLoad(handler):
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes ViewingHistory factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes ViewingHistory factory
 * $api.viewingHistory.onUpdate(): Provides callback to $api
 *                  for updating Viewing History factory
 *
 */
(function (angular, app, _, URI, moment) {

  'use strict';

  app.factory('$viewingHistory', ['$log', '$debug', '$api', '$nav',
        function ($log, $debug, $api, $nav) {
          var viewingHistoryFactory,
              viewingHistory,
              afterLoadEventKey = '$viewingHistory.afterLoad',
              initialize = function initialize(viewingHistoryData) {
                viewingHistory = _(viewingHistoryData)
                  .map(function newView(data) {
                    return new View(data);
                  })
                  .sortBy(function sortByTime(view) {
                    return view.time.valueOf();
                  })
                  .reverse()
                  .value();

                _.trigger(afterLoadEventKey, viewingHistoryFactory);

                $log.debug('$viewingHistory Initialized', viewingHistory);
                return viewingHistoryFactory;
              };

          /**
           * Class View (data):
           * Object representing
           *
           * @field data:
           * @field state:
           * @field uri:
           * @field link
           * @field time:
           * @field all
           * @field $load:
           * @method $push(favoriteData)
           */

          function View(data) {
            $log.debug('new View', data);
            var self = this;
            self.data = data || {};
            self.state = {};
            self.state.uri = URI(self.data.path);
            self.state.time = moment(self.data.time);
          }

          View.prototype = Object.create(Object.prototype, {
            uri: {
              enumerable: true,
              get: function getUri() {
                var self = this;
                return self.state.uri;
              }
            },

            link: {
              enumerable: true,
              get: function getLink() {
                var self = this,
                  path = self.uri.path();
                return $nav.links[path];
              }
            },

            time: {
              enumerable: true,
              get: function getTime() {
                var self = this;
                return self.state.time;
              }
            }
          });

          viewingHistoryFactory = Object.create(Object.prototype, {
            onLoad: {
              enumerable: true,
              value: function onLoad(handler) {
                var self = this;

                _.on(afterLoadEventKey, handler);

                if (_.isArray(viewingHistory)) {
                  handler(self);
                }
              }
            },

            all: {
              enumerable: true,
              get: function getAllViewingHistory() {
                return viewingHistory;
              }
            },

            $load: {
              enumerable: true,
              value: function loadViewingHistory() {
                // sync local state with remote
                return $api.viewingHistory.get().then(initialize);
              }
            },

            $push: {
              enumerable: true,
              value: function pushView(viewData) {
                var view = new View(viewData),
                  existing = _.find(viewingHistory, function findView(other) {
                    return other.uri.equals(view.uri);
                  });

                // update local state
                _.remove(viewingHistory, existing);
                viewingHistory.push(view);

                // update remote state
                $api.viewingHistory.post(view.data);

                return view;
              }
            }
          });

          $api.onLogin(function $viewingHistoryLoginHandler(state) {
            initialize(state.viewingHistory);
          });

          $api.onLogout(function $viewingHistoryLogoutHandler() {
            viewingHistory = null;
          });

          $api.viewingHistory.onUpdate(function $viewingHistoryUpdateHandler() {
            $api.viewingHistory.get().then(function getViewingHistoryResponse(data) {
              initialize(data);
            });
          });

          $debug.services.$viewingHistory = viewingHistoryFactory;
          return viewingHistoryFactory;
        }]);

})(window.angular, window.novantas, window._, window.URI, window.moment);