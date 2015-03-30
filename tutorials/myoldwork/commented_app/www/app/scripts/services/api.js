/**
 * @class Api (Factory):  
*     Object through which all the other services interact with
*       the RESTful architecture implemented by the Java code
 *
 *
 * Private
 * --------
 * @field GET/PUT/POST/DELETE: RESTful verbs
 * @field api:
 * @field state :
 *
 *
 * Public
 * --------

 * @method onLoad(handler):
 * @method current()
 * @method $login(username, password, organization)
 

 */

(function (angular, app, _, btoa, URI) {
  'use strict';

  app.factory('$api', ['$log', '$debug', '$timeout', '$config', '$http', '$q', '$cacheFactory',

    function ($log, $debug, $timeout, $config, $http, $q, $cacheFactory) {

      var GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        DELETE = 'DELETE',
        api,
        state = {},

        /**
         *  Top-level uri for all api calls
         */
          apiUri = URI($config.apiHost).segment('v1'),
        apiResource = function apiResource() {
          return apiUri.clone();
        },

        /**
         * Sub paths for connecting various
         *   AngularJS services to various
         *   Java dropwizard REST services
         */

        geoUri = apiResource().segment('geo'),
        geoResource = function geoResource() {
          return geoUri.clone();
        },
        navigationUri = apiResource().segment('navigation'),
        navigationResource = function navigationResource() {
          return navigationUri.clone();
        },
        favoritesUri = apiResource().segment('favorites'),
        favoritesResource = function favoritesResource() {
          return favoritesUri.clone();
        },
        viewingHistoryUri = apiResource().segment('views'),
        viewingHistoryResource = function viewingHistoryResource() {
          return viewingHistoryUri.clone();
        },
        postsUri = apiResource().segment('posts'),
        postsResource = function postsResource() {
          return postsUri.clone();
        },
        reportsUri = apiResource().segment('reports'),
        reportsResource = function reportsResource() {
          return reportsUri.clone();
        },
        categoriesUri = apiResource().segment('categories'),
        categoriesResource = function reportsResource() {
          return categoriesUri.clone();
        },
        exportUri = apiResource().segment('export'),
        exportResource = function exportResource() {
          return exportUri.clone();
        },
        exportReportUri = exportResource().segment('reports'),
        exportReportResource = function exportReportResource(reportUri) {
          return exportReportUri.clone().segment(reportUri).normalizePathname();
        },
        loggingUri = apiResource().segment('logging'),
        loggingResource = function loggingResource() {
          return loggingUri.clone();
        },
        rolesUri = apiResource().segment('roles'),
        rolesResource = function rolesResource() {
          return rolesUri.clone();
        },
        usersUri = apiResource().segment('users'),
        usersResource = function usersResource() {
          return usersUri.clone();
        },
        jasperUri = apiResource().segment('jasper'),
        jasperResource = function jasperResource() {
          return jasperUri.clone();
        },
        jasperReportsUri = jasperResource().segment('reports'),
        jasperReportResource = function jasperReportResource(reportUri) {
          return jasperReportsUri.clone().segment(reportUri).normalizePathname();
        },
        organizationsUri = apiResource().segment('organizations'),
        organizationsResource = function usersResource() {
          return organizationsUri.clone();
        },
        helpTopicsUri = apiResource().segment('helptopics'),
        helpTopicsResource = function helpTopicsResource() {
          return helpTopicsUri.clone();
        },

        /**
         *  The following keys are used to repopulate the
         *    client-side services/factories after an event
         *    that changes the data available on the server
         */
        afterLoginEventKey = '$api.afterLogin',
        afterUpdateLoginEventKey = '$api.updateLogin',
        afterLogoutEventKey = '$api.afterLogout',
        afterViewingHistoryUpdateEventKey = '$api.afterViewingHistoryUpdate',
        afterFavoritesUpdateEventKey = '$api.afterFavoritesUpdate',
        afterNavigationUpdateEventKey = '$api.afterNavigationUpdate',
        afterReportUpdateEventKey = '$api.afterReportUpdate',
        afterCategoryUpdateEventKey = '$api.afterCategoryUpdate',

      //
        cache = $cacheFactory('data_cache');

      /**
       * Api object: Object that connects server and client through http request
       *
       * @method $login:  Logs user into applicatoin
       * @method onLogin:  After login, executes handler defined in another service
       * @method $updateLogin: Resetting login username/password
       * @method onUpdateLogin:  After updating, executes handler defined in another service
       * @method $logout:  Logs user out of application
       * @method onLogout: After logout, executes handler defined in another service
       * @method logEvent:
       */
      api = {
        $login: function (username, password, organization) {
          $log.debug('api.$login', username, organization);

          var request = {
              withCredentials: true,
              method: GET,
              url: apiResource().segment('login').toString()
            },
            authUsername;

          if (username && password) {
            $log.debug('Starting New Session');
            authUsername = organization ? username + '|' + organization : username;
            request = _.extend(request, { headers: { authorization: 'Basic ' + btoa(authUsername + ':' + password) } });
          } else {
            $log.debug('Use Existing Session');
          }

          $log.debug('api.$login request', request);

          return $http(request)
            .then(function (response) {
              state = response.data;
              $log.debug('Logged In', state);
              _.trigger(afterLoginEventKey, state);
              return state;
            });
        },

        onLogin: function onLogin(handler) {
          _.on(afterLoginEventKey, handler);

          // if currently logged in, trigger handler on subscription
          if (!_.isEmpty(state)) {
            handler(state);
          }
        },


        $updateLogin: function (username, password, newPassword) {
          var request = {
            withCredentials: true,
            method: POST,
            url: apiResource().segment('login').toString()
          };

          if (username && password && newPassword) {
            $log.debug('Reset password and login');
            request = _.extend(request, { data: { 'userName': username, 'oldPassword': password, 'newPassword': newPassword  } });
          } else {
            $log.debug('Use Existing Session');
          }

          $log.debug('api.$updateLogin request', request);

          return $http(request)
            .then(function apiLoginSuccess(response) {
              $log.debug('api.$updateLogin success', response.data);
              state = response.data;
              _.trigger(afterUpdateLoginEventKey, state);
              return state;
            },
            function apiLoginError(response) {
              $log.error('api.$updateLogin ', response.data);
              return response.data;
            });
        },

        onUpdateLogin: function onUpdateLogin(handler) {
          _.on(afterUpdateLoginEventKey, handler);

          // if currently logged in, trigger handler on subscription
          if (!_.isEmpty(state)) {
            handler(state);
          }
        },

        $logout: function () {
          $log.debug('api.$logout');

          var request = {
            withCredentials: true,
            method: GET,
            url: apiResource().segment('logout').toString()
          };

          $log.debug('api.$logout request', request);

          return $http(request)
            .then(function () {
              $log.debug('Logged Out');
              state = {};
              $log.debug('flush cache');
              cache.removeAll();
              _.trigger(afterLogoutEventKey);
            });
        },

        onLogout: function onLogout(handler) {
          _.on(afterLogoutEventKey, handler);
        },

        logEvent: function logEvent(event){
          $log.debug('api.logEvent');

          var request = {
            withCredentials: true,
            method: POST,
            url: loggingResource().toString(),
            data: event || {}
          };

          $log.debug('api.logEvent.post request', request);

          return $http(request);
        },

        /**
         * api.help:
         * @method topics:
         *
         */
        help: {
          topics: function getHelpTopics() {
            $log.debug('api.help.topics');

            var request = {
              withCredentials: true,
              method: GET,
              url: helpTopicsResource().toString()
            };

            $log.debug('api.help.topics request', request);

            return $http(request)
              .then(function getHelpTopicsSuccess(response) {
                $log.debug('api.help.topics success', response.data);
                return response.data;
              },
              function getHelpTopicsError(response) {
                $log.error('api.help.topics', response.data);
                return response.data;
              });
          }
        },

        /**
         * api.navigation:
         * @method get:
         * @method getAll:
         * @method onUpdate:
         */
        navigation: {
          get: function getNavigation() {
            $log.debug('api.navigation.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: navigationResource().toString()
            };

            $log.debug('api.navigation.get request', request);

            return $http(request)
              .then(function getNavigationSuccess(response) {
                $log.debug('api.navigation.get success', response.data);
                return response.data;
              },
              function getNavigationError(response) {
                $log.error('api.navigation.get failure', response.data);
                return response.data;
              });
          },

          getAll: function getAllNavigation() {
            $log.debug('api.navigation.getAll');

            var request = {
              withCredentials: true,
              method: GET,
              url: navigationResource().segment('all').toString()
            };

            $log.debug('api.navigation.getall request', request);

            return $http(request)
              .then(function getNavigationAllSuccess(response) {
                $log.debug('api.navigation.getAll success', response.data);
                return response.data;
              },
              function getNavigationAllError(response) {
                $log.error('api.navigation.getAll failure', response.data);
                return response.data;
              });
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterNavigationUpdateEventKey, handler);
          }
        },

        /**
         * api.viewingHistory:
         * @method get:
         * @method post:
         * @method onUpdate:
         */
        viewingHistory: {
          get: function getViewingHistory() {
            $log.debug('api.viewingHistory.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: viewingHistoryResource().toString()
            };

            $log.debug('api.viewingHistory.get request', request);

            return $http(request)
              .then(function getViewingHistorySuccess(response) {
                $log.debug('api.viewingHistory.get success', response.data);
                return response.data;
              },
              function getViewingHistoryError(response) {
                $log.error('api.viewingHistory.get failure', response.data);
                return response.data;
              });
          },

          post: function postView(viewData) {
            $log.debug('api.viewingHistory.post');

            var request = {
              withCredentials: true,
              method: POST,
              url: viewingHistoryResource().toString(),
              data: viewData || {}
            };

            $log.debug('api.viewingHistory.post request', request);

            return $http(request).then(function afterPostView() {
              _.trigger(afterViewingHistoryUpdateEventKey);
            });
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterViewingHistoryUpdateEventKey, handler);
          }
        },
        /**
         * api.organizations:
         *  @method get:
         */
        organizations : {
          get: function getOrganizations() {
            $log.debug('api.organizations.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: organizationsResource().toString()
            };
            $log.debug('api.organizations.get request', request);

            return $http(request)
              .then(function getOrganizationsSuccess(response) {
                $log.debug('api.organizations.get success', response.data);
                return response.data;
              },
              function getOrganizationsError(response) {
                $log.error('api.organizations.get failure', response.data);
                return response.data;
              });
          }
        },

        /**
         * api.roles:
         * @method get:
         * @method delete:
         * @method put:
         * @method permissions:
         * @method effectivePermissions:
         * @method savePermissions:
         */
        roles: {
          get: function getRoles() {
            $log.debug('api.roles.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: rolesResource().toString()
            };

            $log.debug('api.roles.get request', request);

            return $http(request)
              .then(function getRolesSuccess(response) {
                $log.debug('api.roles.get success', response.data);
                return response.data;
              },
              function getRolesError(response) {
                $log.error('api.roles.get failure', response.data);
                return response.data;
              });
          },

          delete: function deleteRole(role) {
            $log.debug('api.roles.delete');

            var request = {
              withCredentials: true,
              method: DELETE,
              url: rolesResource().segment(role).toString()
            };

            $log.debug('api.roles.delete request', request);

            return $http(request)
              .then(function deleteRoleSuccess(response) {
                $log.debug('api.roles.delete success', response.data);
                return response.data;
              },
              function deleteRoleError(response) {
                $log.error('api.categories.roles.delete failure', response.data);
                return response.data;
              });
          },

          put: function putRole(role) {
            $log.debug('api.roles.put');

            var request = {
              withCredentials: true,
              method: PUT,
              url: rolesResource().segment(role).toString()
            };

            $log.debug('api.roles.put request', request);

            return $http(request)
              .then(function putRoleSuccess(response) {
                $log.debug('api.roles.put success', response.data);
                return response.data;
              },
              function putRoleError(response) {
                $log.error('api.roles.put failure', response.data);
                return response.data;
              });
          },

          permissions: function permissions(role) {
            $log.debug('api.roles.permissions');
            $log.debug('Role', role);
            $log.debug(rolesResource());
            $log.debug(rolesResource().segment(role));
            $log.debug(rolesResource().segment(role).segment('permissions'));

            var request = {
              withCredentials: true,
              method: GET,
              url: rolesResource().segment(role).segment('permissions').toString()
            };

            $log.debug('api.roles.permissions request', request);

            return $http(request)
              .then(function rolesPermissionSuccess(response) {
                $log.debug('api.roles.permissions success', response.data);
                return response.data;
              },
              function rolesPermissionError(response) {
                $log.error('api.roles.permissions failure', response.data);
                return response.data;
              });
          },

          effectivePermissions: function effectivePermissions(role) {
            $log.debug('api.roles.permissions');

            var request = {
              withCredentials: true,
              method: GET,
              url: rolesResource().segment(role).segment('effective_permissions').toString()
            };

            $log.debug('api.roles.effectivePermissions request', request);

            return $http(request)
              .then(function rolesEffectivePermissionsSuccess(response) {
                $log.debug('api.roles.effectivePermissions success', response.data);
                return response.data;
              },
              function rolesEffectivePermissoinsError(response) {
                $log.error('api.roles.effectivePermissions failure', response.data);
                return response.data;
              });
          },

          savePermissions: function saveRolePermissions(role, permissions) {
            $log.debug('api.roles.permissions');

            var request = {
              withCredentials: true,
              method: PUT,
              data: permissions,
              url: rolesResource().segment(role).segment('permissions').toString()
            };

            $log.debug('api.roles.savePermissions request', request);

            return $http(request)
              .then(function rolesSavePermissionsSuccess(response) {
                $log.debug('api.roles.savePermissions success', response.data);
                return response.data;
              },
              function rolesSavePermissionsError(response) {
                $log.error('api.roles.savePermissions failure', response.data);
                return response.data;
              });
          }
        },

        /**
         * api.users:
         * @method get:
         * @method put:
         * @method delete:
         * @method reset:
         * @method requestReset:
         * @method permissions:
         * @method savePermissions:
         */
        users: {
          get: function getUsers() {
            $log.debug('api.users.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: usersResource().toString()
            };

            $log.debug('api.users.get request', request);

            return $http(request)
              .then(function getUsersSuccess(response) {
                $log.debug('api.users.get success', response.data);
                return response.data;
              },
              function getUsersError(response) {
                $log.error('api.users.get failure', response.data);
                return response.data;
              });
          },

          put: function putUser(userName, userInfo) {
            $log.debug('api.users.put');

            var request = {
              withCredentials: true,
              method: PUT,
              data: userInfo,
              url: usersResource().segment(userName).toString()
            };

            $log.debug('api.users.put request', request);

            return $http(request)
              .then(function putUserSuccess(response) {
                $log.debug('api.users.put success', response.data);
                return response.data;
              },
              function putUserError(response) {
                $log.error('api.users.put failure', response.data);
                return response.data;
              });
          },

          delete: function putUser(userName) {
            $log.debug('api.users.delete');

            var request = {
              withCredentials: true,
              method: DELETE,
              url: usersResource().segment(userName).toString()
            };

            $log.debug('api.users.delete request', request);

            return $http(request)
              .then(function deleteUserSuccess(response) {
                $log.debug('api.users.delete success', response.data);
                return response.data;
              },
              function deleteUserError(response) {
                $log.error('api.users.delete failure', response.data);
                return response.data;
              });
          },

          reset: function putUser(userName) {
            $log.debug('api.users.reset');

            var request = {
              withCredentials: true,
              method: POST,
              url: usersResource().segment(userName).segment('reset').toString()
            };

            $log.debug('api.users.reset request', request);

            return $http(request)
              .then(function resetUserSuccess(response) {
                $log.debug('api.users.reset success', response.data);
                return response.data;
              },
              function resetUserError(response) {
                $log.error('api.users.reset failure', response.data);
                return response.data;
              });
          },

          requestReset: function requestReset(userName) {
            $log.debug('api.users.requestReset');

            var request = {
              withCredentials: true,
              method: POST,
              url: usersResource().segment(userName).segment('request_reset').toString()
            };

            $log.debug('api.users.requestReset request', request);

            return $http(request)
              .then(function requestResetSuccess(response) {
                $log.debug('api.users.resetRequest success', response.data);
                return response.data;
              },
              function requestResetError(response) {
                $log.error('api.users.resetRequest failure', response.data);
                return response.data;
              });
          },

          permissions: function permissions(user) {
            $log.debug('api.users.permissions');

            var request = {
              withCredentials: true,
              method: GET,
              url: usersResource().segment(user).segment('permissions').toString()
            };

            $log.debug('api.users.permissions request', request);

            return $http(request)
              .then(function getUserPermissionsSuccess(response) {
                $log.debug('api.users.permissions success', response.data);
                return response.data;
              },
              function getUserPermissionsError(response) {
                $log.error('api.users.permissions failure', response.data);
                return response.data;
              });
          },

          savePermissions: function saveUserPermissions(user, permissions) {
            $log.debug('api.users.savePermissions');

            var request = {
              withCredentials: true,
              method: PUT,
              data: permissions,
              url: usersResource().segment(user).segment('permissions').toString()
            };

            $log.debug('api.users.savePermissions request', request);

            return $http(request)
              .then(function putUserPermissionsSuccess(response) {
                $log.debug('api.users.permissions success', response.data);
                return response.data;
              },
              function putUserPermissionsError(response) {
                $log.error('api.users.permissions failure', response.data);
                return response.data;
              });
          }
        },

        /**
         *  api.favorites: Connects favorites.js service to Favorites Java API
         *                  and ui.Favorites through REST
         *  @method get: gets list of current user favorites
         *  @method put:  adds new favorite
         *  @method delete:  deletes User Favorite
         *  @method onUpdate:  For updating favorite.  Callback in favorites.js
         */
        favorites: {
          get: function getFavorites() {
            $log.debug('api.favorites.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: favoritesResource().toString()
            };

            $log.debug('api.favorites.get request', request);

            return $http(request)
              .then(function getFavoritesSuccess(response) {
                $log.debug('api.favorites.get success', response.data);
                return response.data;
              },
              function getFavoritesError(response) {
                $log.error('api.favorites.get failure', response.data);
                return response.data;
              });
          },

          put: function putFavorite(favoriteData) {
            $log.debug('api.favorites.put');

            var request = {
              withCredentials: true,
              method: PUT,
              url: favoritesResource().toString(),
              data: favoriteData || {}
            };

            $log.debug('api.favorites.put request', request);

            return $http(request).then(function afterPutFavorite() {
              $log.debug('api.favorites.put success');
              _.trigger(afterFavoritesUpdateEventKey);
            },
              function putFavoriteError(response) {
                $log.error('api.favorites.put failure', response.data);
                return response.data;
              });
          },

          delete: function deleteFavorite(path) {
            $log.debug('api.favorites.delete');

            var request = {
              withCredentials: true,
              method: DELETE,
              url: favoritesResource().segment(path).normalizePathname().toString()
            };

            $log.debug('api.favorites.delete request', request);

            return $http(request).then(function afterDeleteFavorite() {
              $log.debug('api.favorites.delete success');
              _.trigger(afterFavoritesUpdateEventKey);
            },
              function favoritesDeleteError(response) {
                $log.error('api.favorites.deletey failure', response.data);
                return response.data;
              });
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterFavoritesUpdateEventKey, handler);
          }
        },


        /**
         * posts: Connects post.js service to Favorites POST API
         *          and Database ui.Favorites through REST
         * method get:
         */
        posts: {
          get: function getPosts() {
            $log.debug('api.posts.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: postsResource().toString()
            };

            $log.debug('api.posts.get request', request);

            return $http(request)
              .then(function getPostsSuccess(response) {
                $log.debug('api.posts.get success', response.data);
                return response.data;
              },
              function getPostError(response) {
                $log.error('api.posts.get success failure', response.data);
                return response.data;
              });
          }
        },

        /**
         * api.categories: The term 'category' is used variously
         *                 It can refer to any navigation Link that is not a report
         *                 It can also specifically mean a top-level Link
         *                 A category is a type of Link
         *                 Api.categories connects various services to the
         *                 Java API Categories and to ui.Categories and also
         *                 Java API Links and to ui.Links and ui.LinkHeirarchy
         *                 through RESTful calls
         *  @method get: Gets the list of top-level Categories
         *  @method onUpdate: Responds to a request to update navigation
         *                    after a non-report Link is created/deleted.
         *                    Callback is in category.js
         *  @method create: Create a non-report Link
         *  @method delete: Delete a non-report Link
         *  @method rename: Rename a non-report Link
         */
        categories: {

          get : function getAllCategories() {
            $log.debug('api.categories.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: categoriesResource().toString()
            };

            $log.debug('api.categories.get request', request);

            return $http(request)
              .then(function getCategoriesSuccess(response) {
                $log.debug('api.categories.get success', response.data);
                return response.data;
              },
              function getCategoriesError(response) {
                $log.error('api.categories.get failure', response.data);
                return response.data;
              });
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterCategoryUpdateEventKey, handler);
          },

          create : function createSubcategory(parentPath, childName) {
            $log.debug('api.categories.createSubcategory',
              'ParentPath ', parentPath, 'childName ', childName);
            var request = {
              withCredentials: true,
              method: POST,
              url: categoriesResource().segment('create').toString(),
              data: {parentPath: parentPath, childName: childName}
            };

            $log.debug('api.categories.create request', request);

            return $http(request)
              .then(
              function createSuccess(response) {
                $log.debug('api.categories.createSubcategory success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                _.trigger(afterCategoryUpdateEventKey);
                return response.data;
              },
              function createError(response) {
                $log.error('api.categories.createSubcategory failure', response.data);
                return response.data;
              }
            );

          },

          delete : function deleteCategory(path) {
            $log.debug('api.categories.delete', 'path ', path);
            var request = {
              withCredentials: true,
              method: POST,
              url: categoriesResource().segment('delete').toString(),
              data: {path: path}
            };
            $log.debug('api.categories.delete request', request);

            return $http(request)
              .then(
              function deleteSuccess(response) {
                $log.debug('api.categories.delete success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function deleteError(response) {
                $log.debug('api.categories.delete failure', response.data);
                return response.data;
              }
            );
          },
          rename : function renameCategory(path, name) {
            $log.debug('api.categories.rename',
              'path ', path, 'name ', name);
            var request = {
              withCredentials: true,
              method: POST,
              url: categoriesResource().segment('rename').toString(),
              data: {path: path, name: name}
            };

            $log.debug('api.categories.rename request', request);

            return $http(request)
              .then(
              function renameSuccess(response) {
                $log.debug('api.categories.rename success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function renameFailure(response) {
                $log.debug('api.categories.rename failure', response.data);
                return response.data;
              }
            );
          }
        },

        /**
         * api.reports:  A Novantas Report, stored in the Microsoft DB,
         *               Maps JasperReports to navigation Links
         *               Connects reports.js service with Java Reports and Links
         *                 and to SQL Server ui.Reports, ui.Links, ui.LinkHeirarchy
         *               Through RESTful calls
         * @method onUpdate: Triggered when reports list needs to be refreshed.
         *                   Callback in report.js
         * @method categorize: Adds Report as a child node to a category in LinkHeirarchy
         * @method uncategorize: Removes the LinkHeirarchy relationship with a parent Category
         * @method editJSON:  Edits the JSON information stored in ui.Reports
         * @method deployReports:  Copies a set of reports to a set of organizations
         * @method update:
         * @method get:
         * @method delete:  Deletes a Report from Database
         * @method copy:  Creates a new Report based on Report Template
         */

        reports: {

          clean: function cleanReportDB() {
            $log.debug('api.reports.cleanReports');

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('clean').toString()
            };

            $log.debug('api.reports.cleanReports request', request);

            return $http(request)
              .then(
              function cleanReportsSuccess(response) {
                $log.debug('api.reports.clean success', response.data);
                return response.data;
              },
              function cleanReportsError(response) {
                $log.debug('api.reports.clean failure', response.data);
                return response.data;
              })
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterReportUpdateEventKey, handler);
          },

          categorize: function categorizeReports(uri, name, categories, id) {
            $log.debug('api.reports.categorize');
            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('categories').toString(),
              data: {uri: uri, name: name, categories: categories, reportId: id }
            };

            $log.debug('api.reports.categorize request', request);

            return $http(request)
              .then(
              function categorizeSuccess(response) {
                $log.debug('api.reports.categorize success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                _.trigger(afterReportUpdateEventKey);
                return response.data;
              },
              function categorizeError(response) {
                $log.debug('api.reports.categorize failure', response.data);
                return response.data;
              }
            );
          },

          uncategorize: function uncategorizeReports(reportId, uri, category) {
            $log.debug('api.reports.uncategorize');

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('uncategory').toString(),
              data: { category: category, uri: uri, reportId: reportId }
            };

            $log.debug('api.reports.uncategorize request', request);

            return $http(request)
              .then(
              function uncategorizeSuccess(response) {
                $log.debug('api.reports.uncategorize success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function uncategorizeError(response) {
                $log.debug('api.reports.uncatgorize failure', response.data);
                return response.data;
              }
            );
          },

          editJSON: function editMetadata(reportId, uri, metadata) {
            $log.debug('api.reports.editJson');

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('metadata').toString(),
              data: { id: reportId, uri: uri, metadata: metadata}
            };

            $log.debug('api.reports.editJson request', request);

            return $http(request)
              .then(
              function editJSONSuccess(response) {
                $log.debug('api.reports.editJSON success', response.data);
                _.trigger(afterReportUpdateEventKey);
                return response.data;
              },
              function editJSONFailure(response) {
                $log.debug('api.reports.editJSON failure', response.data);
                return response.data;
              }
            );
          },

          deployReports : function  deployReports(reportList, organizationList){
            $log.debug('api.reports.deployReports');

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('deployment').toString(),
              data: { reports: reportList, organizations: organizationList }
            };

            $log.debug('api.reports.deployReports request', request);

            return $http(request)
              .then(
              function deploymentSuccess(response) {
                $log.debug('api.reports.deployReports success', response.data);
                return response.data;
              },
              function deploymentError(response) {
                $log.debug('api.reports.deployReports failure', response.data);
                return response.data;
              }
            );
          },

          update: function updateReport(reportId, reportUri, label, description){
            $log.debug('api.reports.update');

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment(reportId).toString(),
              data: { type: 'edit', label: label, description: description }
            };

            $log.debug('api.reports.update request', request);

            var promise = $http(request)
              .then (
              function editSuccess(response) {
                $log.debug('api.reports.update success', response.data);

                //remove the cached version of the report so it will reload
                var cacheKey = 'report_' + reportUri;
                cache.remove(cacheKey);
                $log.debug('Removed report from cache:' + cacheKey);
                _.trigger(afterReportUpdateEventKey)
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function editError(response) {
                $log.debug('api.reports.update failure', response.data);

                var status = response.status;
                var data = response.data;
                // server error
                if (status == 500) {
                  $log.error('500 error during custom report update');
                }
                // other errors
                else {
                  $log.error (status, 'error during custom report update');
                  $log.error ('Error data: ', data);
                }
                return data;
              }
            );
            return promise;
          },


          get: function getReports() {
            $log.debug('api.reports.get');

            var request = {
              withCredentials: true,
              method: GET,
              url: reportsResource().toString()
            };

            $log.debug('api.reports.get request', request);

            return $http(request)
              .then(function getReportsSuccess(response) {
                $log.debug('api.reports.get success', response.data);
                return response.data;
              },
              function getReportsError(response) {
                $log.error('api.reports.get failure', response.data);
                return response.data;
              });
          },

          delete: function deleteReport(reportId) {
            $log.debug('api.reports.delete', reportId);

            var request = {
              withCredentials: true,
              method: DELETE,
              url: reportsResource().segment(reportId).toString()
            };

            $log.debug('api.reports.delete request', request);

            return $http(request)
              .then(function deleteReportSuccess(response) {
                $log.debug('api.reports.delete success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function deleteReportError(response) {
                $log.error('api.reports.delete failure', response.data);
                return response.data;
              });
          },

          copy: function copyReport(reportId, label, description) {
            $log.debug('api.reports.copy', reportId, label, description);

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment(reportId).toString(),
              data: { type: 'copy', label: label, description: description }
            };

            $log.debug('api.reports.copy request', request);

            return $http(request)
              .then(function copyReportSuccess(response) {
                $log.debug('api.reports.copy success', response.data);
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function copyReportError(response) {
                $log.error('api.reports.copy failure', response.data);
                return response.data;
              });
          }
        },
        /**
         * api.jasper: For making RESTful calls to Java JasperReports
         *              which maps to PostGres Jasper Database and
         *              and to the JasperServer
         * @method allReports:
         * @method export:
         * @method report:
         * @method cachedData:
         * @method data:
         * @method inputs:
         * @method setInputs:
         */
        jasper: {
          allReports: function getAllReports(){
            $log.debug('api.jasper.report.all');

            var request = {
              withCredentials: true,
              method: GET,
              url: jasperReportResource('all').toString()
            };

            $log.debug('api.jasper.report.all', request);
            return $http(request)
              .then(function jasperAllReportsSuccess(response) {
                $log.debug('api.jasper.report success', response.data);
                return response.data;
              },
              function jasperAllReportsError(response) {
                $log.error('api.jasper.report failure', response.data);
                return response.data;
              });
          },

          export: function (reportUri, parameters, exportType) {
            $log.debug('api.jasper.export', reportUri, parameters);

            var postR = {
              withCredentials: true,
              method: POST,
              url: exportReportResource(reportUri).segment(exportType).toString(),
              data: parameters || {}
            };
            $log.debug('api.jasper.export request', postR);

            return $http(postR)
              .then(function jasperExportSuccess(response) {
                $log.debug('api.jasper.export success', response.data);
                return exportReportResource(reportUri).segment(response.data).toString();
              },
              function jasperExportError(response) {
                $log.error('api.jasper.export failure', response.data);
                return response.data;
              });
          },

          report: function (reportUri) {
            $log.debug('api.jasper.report', reportUri);

            var cacheKey = 'report_' + reportUri;

            if (cache.get(cacheKey)) {
              var deferred = $q.defer();
              deferred.resolve(cache.get(cacheKey));
              return deferred.promise;
            }
            else {
              var request = {
                withCredentials: true,
                method: GET,
                url: jasperReportResource(reportUri).toString()
              };
              $log.debug('api.jasper.report request', request);

              return $http(request)
                .then(function jasperReportSuccess(response) {
                  $log.debug('api.jasper.report success', response.data);
                  cache.put(cacheKey, response.data);
                  return response.data;
                },
                function jasperReportError(response) {
                  $log.error('api.asper.report failure', response.data);
                  return response.data;
                });
            }
          },

          cachedData: function(reportUri, parameters){
            var cacheKey = JSON.stringify({ uri: reportUri, parameters: parameters});

            if (cache.get(cacheKey)) {
              var deferred = $q.defer();
              deferred.resolve(cache.get(cacheKey));
              $log.debug('Returning from cache: ' + cacheKey);
              return deferred.promise;
            }
            else {
              return api.jasper.data(reportUri, parameters).then(function(data){
                cache.put(cacheKey, data);
                $log.debug('Not found in cache: ' + cacheKey);
                return data;
              });
            }
          },

          data: function (reportUri, parameters) {
            $log.debug('api.jasper.data', reportUri, parameters);

            var request = {
              withCredentials: true,
              method: POST,
              url: jasperReportResource(reportUri).segment('data').toString(),
              data: parameters || {}
            };

            $log.debug('api.jasper.data request', request);

            return $http(request)
              .then(function (response) {
                $log.debug('api.jasper.data success', response.data);
                return response.data;
              },
              function createError(response) {
                $log.error('api.jasper.data failure', response.data);
                return response.data;
              });
          },

          inputs: function (reportUri) {
            $log.debug('api.jasper.inputControls', reportUri);

            var cacheKey = 'inputs_' + reportUri;

            if (cache.get(cacheKey)) {
              var deferred = $q.defer();
              deferred.resolve(cache.get(cacheKey));
              return deferred.promise;
            }
            else {
              var request = {
                withCredentials: true,
                method: GET,
                url: jasperReportResource(reportUri).segment('controls').toString()
              };

              $log.debug('api.jasper.inputControls request', request);

              return $http(request)
                .then(function jasperInputControlsSuccess(response) {
                  $log.debug('api.jasper.inputControls success', response.data);
                  cache.put(cacheKey, response.data);
                  return response.data;
                },
                function jasperInputControlsError(response) {
                  $log.error('api.jasper.inputControls failure', response.data);
                  return response.data;
                });
            }

          },

          setInputs: function (reportUri, inputControls) {
            $log.debug('api.jasper.setInputControls', reportUri, inputControls);
          }
        }
      };

      $debug.services.$api = api;
      return api;
    }]);

}) (window.angular, window.novantas, window._, window.btoa, window.URI);

