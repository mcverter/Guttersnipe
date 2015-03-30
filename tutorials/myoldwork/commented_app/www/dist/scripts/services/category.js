(function (angular, app, _) {
  'use strict';

  app.factory('$category', ['$log', '$debug', '$api', '$nav',
    function ($log, $debug, $api, $nav) {
      var categoryFactory,
          categories = {},
          afterLoadEventKey = '$category.afterLoad',
          initialize = function $categoryInitialize(state) {
            categories = state.categories;

            _.trigger(afterLoadEventKey, categoryFactory);

            $log.debug('$category Initialized', categories);
            return categoryFactory;
          };

      $api.onLogin(initialize);
      $api.onLogout(function $categoryLogoutHandler() {
        categories = {};
      });

      categoryFactory = Object.create(Object.prototype, {
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(categories)) {
              handler(self);
            }
          }
        },

        link: {
          enumerable: true,
          value: function (categoryId) {
            var categoryLink = categories[categoryId],
              link = $nav.links[categoryLink];
            return link;
          }
        }
      });

      $debug.services.$category = categoryFactory;
      return categoryFactory;
    }]);

}) (window.angular, window.novantas, window._);