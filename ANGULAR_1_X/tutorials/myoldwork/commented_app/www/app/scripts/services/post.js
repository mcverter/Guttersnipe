/**
 * @class Post (Factory):
 * Returns an object
 *
 * Private
 * --------
 * @field postFactory:  Returned object
 * @field posts:
 * @field afterLoadEventKey :
 * @method initialize : Initializes to reports object
 *
 * Public
 * --------
 *
 * Extern
 * ------
 * $api.onLogin():  
*       Handler for initializing factory on login
 * $api.onLogout(): 
*       Handler for erasing factory on logout
 *

 */

(function (angular, app, _, URI, moment) {

  'use strict';

  app.factory('$post', ['$log', '$debug', '$api',
    function ($log, $debug, $api) {
      var postFactory,
          posts,
          afterLoadEventKey = '$post.afterLoad',
          initialize = function initialize(postsData) {
            posts = _(postsData).reduce(function postType(acc, list, type) {
                acc[type] = _(list).map(function newPost(postData) {
                  return new Post(postData);
                });
                return acc;
              }, {});

            _.trigger(afterLoadEventKey, postFactory);

            $log.debug('$post Initialized', posts);
            return postFactory;
          };
/**
 * Class Post:
 * Object representing a Favorite from ui.Reports table
 *
 * @field data:
 * @field state:
 * @field uri:
 * @field title:
 * @field imageUri:
 * @field body:
 * @field created:
 * @field type:
 * @method $load():
**/
      function Post(data) {
        $log.debug('new Post', data);

        var self = this;
        self.data = data || {};
        self.state = {};

        if (self.data.uri) {
          self.state.uri = URI(self.data.uri);
        }

        if (self.data.imageUri) {
          self.state.imageUri = URI(self.data.imageUri);
        }

        self.state.created = moment(self.data.created);
      }

      Post.prototype = Object.create(Object.prototype, {
        uri: {
          enumerable: true,
          get: function getUri() {
            var self = this;
            return self.state.uri;
          }
        },

        title: {
          enumerable: true,
          get: function getTitle() {
            var self = this;
            return self.data.title;
          }
        },

        imageUri: {
          enumerable: true,
          get: function getImageUrl() {
            var self = this;
            return self.state.imageUri;
          }
        },

        body: {
          enumerable: true,
          get: function getBody() {
            var self = this;
            return self.data.body;
          }
        },

        created: {
          enumerable: true,
          get: function getCreated() {
            var self = this;
            return self.state.created;
          }
        },

        type: {
          enumerable: true,
          get: function getType() {
            var self = this;
            return self.data.type;
          }
        }
      });

      postFactory = Object.create(Object.prototype, {
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (_.isObject(posts)) {
              handler(self);
            }
          }
        },

        all: {
          enumerable: true,
          get: function getAllPosts() {
            return posts;
          }
        },

        $load: {
          enumerable: true,
          value: function loadPosts() {
            // sync local state with remote
            return $api.posts.get()
              .then(function (data) {
                return initialize(data);
              });
          }
        }
      });

      $api.onLogin(function $postLoginHandler(state) {
        initialize(state.posts);
      });

      $api.onLogout(function $postLogoutHandler() {
        posts = null;
      });

      $debug.services.$post = postFactory;
      return postFactory;
    }]);

})(window.angular, window.novantas, window._, window.URI, window.moment);