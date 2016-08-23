/**
 * @class Category (Factory):
 * Returns an object containing all the Novantas Categories,
 *    in SQL Server ui.Categories table
 *    A Category is a top-level UI Link, and thus related to ui.Links table
 *
 * Private
 * --------
 * @field categoryFactory:  Returned Object
 * @field categories: Internal list of Categories
 * @field afterLoadEventKey :   Trigger for reloading the categories from the server
 *                            and updating the factory
 * @method initialize :  Initializes the categories object
 *
 * Public
 * --------
 *
 * @method onLoad(handler):
 * @method link:
 *
 *
 * Extern
 * ------
 * $api.onLogin():  
*       Handler for initializing factory on login
 * $api.onLogout(): 
*       Handler for erasing factory on logout
 * $api.category.onUpdate()  
         Trigger for reinitializing factory from the server
 *
 */

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

            return categoryFactory;
          };

      $api.onLogin(initialize);
      $api.onLogout(function $categoryLogoutHandler() {
        categories = {};
      });

      $api.categories.onUpdate(function $categoryUpdateHandler() {
        $api.categories.get().then(function getCategoriesResponse(data) {
          initialize(data);
        });
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