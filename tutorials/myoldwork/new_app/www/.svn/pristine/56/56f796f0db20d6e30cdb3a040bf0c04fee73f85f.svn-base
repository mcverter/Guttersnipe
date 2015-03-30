(function (angular, app, _, URI) {

  'use strict';

  app.factory('$favorite', ['$log', '$debug', '$api', '$nav',
        function ($log, $debug, $api, $nav) {
          var favoriteFactory,
              favorites,
              afterLoadEventKey = '$favorite.afterLoad',
              initialize = function initialize(favoritesData) {
                favorites = _(favoritesData).map(function newFavorite(data) {
                  return new Favorite(data);
                }).value();

                _.trigger(afterLoadEventKey, favoriteFactory);

                $log.debug('$favorite Initialized', favorites);
                return favoriteFactory;
              };

          function Favorite(data) {
            $log.debug('new Favorite', data);
            var self = this;
            self.data = data || {};
            self.state = {};
            self.state.uri = URI(self.data.path);
          }

          Favorite.prototype = Object.create(Object.prototype, {
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
                  path = self.uri.path().toString();
                return $nav.links[path];
              }
            },

            $delete: {
              enumerable: true,
              value: function deleteFavorite() {
                var self = this;
                return favoriteFactory.$delete(self.uri);
              }
            }
          });

          favoriteFactory = Object.create(Object.prototype, {
            onLoad: {
              enumerable: true,
              value: function onLoad(handler) {
                var self = this;

                _.on(afterLoadEventKey, handler);

                if (_.isArray(favorites)) {
                  handler(self);
                }
              }
            },

            all: {
              enumerable: true,
              get: function getAllFavorites() {
                return favorites;
              }
            },

            $load: {
              enumerable: true,
              value: function loadFavorites() {
                // sync local state with remote
                return $api.favorites.get().then(initialize);
              }
            },

            find: {
              enumerable: true,
              value: function containsFavorite(uri) {
                return _(favorites).find(function findFavorite(favorite) {
                  return favorite.uri.equals(uri);
                });
              }
            },

            $push: {
              enumerable: true,
              value: function pushFavorite(favoriteData) {
                var favorite = new Favorite(favoriteData);

                // update local state
                favorites.push(favorite);

                // update remote state
                $api.favorites.put(favorite.data);

                return favorite;
              }
            },

            $delete: {
              enumerable: true,
              value: function deleteFavorite(uri) {
                var self = this,
                  favorite = self.find(uri);

                // update local state
                _(favorites).remove(favorite);

                // update remote state
                $api.favorites.delete(uri);

                return favorite;
              }
            }
          });

          $api.onLogin(function $favoriteLoginHandler(state) {
            initialize(state.favorites);
          });

          $api.onLogout(function $favoriteLogoutHandler() {
            favorites = null;
          });

          $api.favorites.onUpdate(function $favoriteUpdateHandler() {
            $api.favorites.get().then(function getFavoritesResponse(data) {
              initialize(data);
            });
          });

          $debug.services.$favorite = favoriteFactory;
          return favoriteFactory;
        }]);

})(window.angular, window.novantas, window._, window.URI);