(function (angular, app, _, URI) {
  'use strict';

  app.factory('$nav', ['$log', '$debug', '$api', '$location',
    function ($log, $debug, $api, $location) {
      var navFactory,
        top = [],
        rawNav = {},
        links = {},
        afterLoadEventKey = '$nav.afterLoad',
        initialize = function $navInitialize(nav) {
          top = [];
          links = {};
          rawNav = nav;

          // links
          _.each(nav.links, function (data, path) {
            links[path] = new Link(data);
          });

          // top
          _.each(nav.top, function (path) {
            top.push(links[path]);
          });

          _.trigger(afterLoadEventKey, navFactory);

          $log.debug('$nav Initialized', top, links);
          return navFactory;
        },
        randomImage = function randomImage() {
          var images = [URI('styles/images/preview-averagebalance.png'),
            URI('styles/images/preview-productsalesmix.png'),
            URI('styles/images/preview-salesthroughput.png')];
          return images[Math.floor(Math.random() * images.length)];
        };

      function Link(data) {
        var self = this;

        self.data = data || {};
        self.state = {};
        self.state.activeRegExp = new RegExp(self.data.activePattern);
        self.state.imageUri = randomImage();

        Object.defineProperties(self, {
          children: {
            enumerable: true,
            configurable: true,
            get: _.memoize(function getChildren() {
              var self = this,
                paths = self.data.children,
                result;

              result = _.chain(paths)
                .filter(function filterMissingPaths(path) {
                  return _.has(links, path);
                })
                .map(function pathToLink(path) {
                  return links[path].clone();
                })
                .value();

              return result;
            })
          },

          parents: {
            enumerable: true,
            configurable: true,
            get: _.memoize(function getParents() {
              var self = this,
                paths = self.data.parents;

              return _.map(paths, function (path) {
                return links[path];
              });
            })
          }
        });
      }

      Link.prototype = Object.create(Object.prototype, {

        path: {
          enumerable: true,
          get: function getPath() {
            var self = this;
            return self.data.path;
          }
        },

        active: {
          enumerable: true,
          get: function getActive() {
            var self = this,
              path = $location.path();
            return !!path.match(self.state.activeRegExp);
          }
        },

        name: {
          enumerable: true,
          get: function getName() {
            var self = this;
            return self.data.name;
          }
        },

        description: {
          enumerable: true,
          get: function getDescription() {
            var self = this;
            return self.data.description;
          }
        },

        imageUri: {
          enumerable: true,
          get: function getImageUri() {
            var self = this;
            return self.state.imageUri;
          }
        },

        clone: {
          enumerable: true,
          value: function clone() {
            var self = this,
              clonedData = _.cloneDeep(self.data);

            return new Link(clonedData);
          }
        }

      });

      $api.onLogin(function $navLoginHandler(state) {
        initialize(state.navigation);
      });

      $api.onLogout(function $navLogoutHandler() {
        top = [];
        links = {};
      });

      $api.navigation.onUpdate(function $navUpdateHandler() {
        $api.navigation.get().then(function getNavigationResponse(data) {
          initialize(data);
        });
      });

      navFactory = Object.create(Object.prototype, {

        rawNav: {
          enumerable: true,
          get: function getRawNav() {
            return rawNav;
          }
        },

        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(links)) {
              handler(self);
            }
          }
        },

        top: {
          enumerable: true,
          get: function getTop() {
            return top;
          }
        },

        links: {
          enumerable: true,
          get: function getLinks() {
            return links;
          }
        }

      });

      $debug.services.$nav = navFactory;
      return navFactory;
    }]);

}) (window.angular, window.novantas, window._, window.URI);
