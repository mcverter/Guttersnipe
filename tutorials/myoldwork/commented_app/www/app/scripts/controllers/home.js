/**
* @class Home (Controller):
*     Puts data on scope for ../views/home.html
      User landing page
*/
(function (angular, app, _, moment) {

  'use strict';

  app.controller('HomeCtrl', ['$scope', '$log', '$user', '$nav', '$favorite', '$viewingHistory', '$post',
      function ($scope, $log, $user, $nav, $favorite, $viewingHistory, $post) {
        var favorites,
          recentlyViewed,
          news,
          system,
          customer;

        $nav.onLoad(function () {
          $favorite.onLoad(function () {
            favorites = _($favorite.all)
              .filter(function filterWithoutLink(f) {
                return _.toBoolean(f.link);
              })
              .value();

            $log.debug('Favorites', favorites);
          });

          $viewingHistory.onLoad(function () {
            recentlyViewed = _($viewingHistory.all)
              .filter(function filterWithoutLink(rv) {
                return _.toBoolean(rv.link);
              })
              .take(5)
              .value();

            $log.debug('Recently Viewed', recentlyViewed);
          });

          $post.onLoad(function () {
            news = _($post.all.news)
              .take(3)
              .value();

            system = $post.all.system;

            customer = $post.all.customer;

            $log.debug('News', news);
          });
        });

        Object.defineProperties($scope, {
          favorites: {
            enumerable: true,
            get: function getFavorites() {
              return favorites;
            }
          },

          recentlyViewed: {
            enumerable: true,
            get: function getRecentlyViewed() {
              return recentlyViewed;
            }
          },

          news: {
            enumerable: true,
            get: function getNews() {
              return news;
            }
          },

          system: {
            enumerable: true,
            get: function getSystem() {
              return system;
            }
          },

          customer: {
            enumerable: true,
            get: function getCustomer() {
              return customer;
            }
          }
        });
      }
    ]
  );

}) (window.angular, window.novantas, window._, window.moment);
