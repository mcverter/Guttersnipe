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
        apiUri = URI($config.apiHost).segment('v1'),
        apiResource = function apiResource() {
          return apiUri.clone();
        },
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

        afterLoginEventKey = '$api.afterLogin',
        afterUpdateLoginEventKey = '$api.updateLogin',
        afterLogoutEventKey = '$api.afterLogout',
        afterViewingHistoryUpdateEventKey = '$api.afterViewingHistoryUpdate',
        afterFavoritesUpdateEventKey = '$api.afterFavoritesUpdate',
        afterNavigationUpdateEventKey = '$api.afterNavigationUpdate',
        afterReportUpdateEventKey = '$api.afterReportUpdate',
        cache = $cacheFactory('data_cache');

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
            request = _.extend(request, { data: { "userName": username, "oldPassword": password, "newPassword": newPassword  } });
          } else {
            $log.debug('Use Existing Session');
          }

          $log.debug('api.$updateLogin request', request);

          return $http(request)
            .then(function (response) {
              state = response.data;

              $log.debug('updateLogin return:', state);
              _.trigger(afterUpdateLoginEventKey, state);

              return state;
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
              .then(function getHelpTopicsResponse(response) {
                return response.data;
              });
          }
        },

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
              .then(function getNavigationResponse(response) {
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
              .then(function getNavigationAllResponse(response) {
                return response.data;
              });
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterNavigationUpdateEventKey, handler);
          }
        },

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
              .then(function getViewingHistoryResponse(response) {
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
              .then(function getOrganizationsResponse(response) {
                return response.data;
              });
          }
        },


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
              .then(function getRolesResponse(response) {
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
              .then(function deleteRoleResponse(response) {
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
              .then(function putRoleResponse(response) {
                return response.data;
              });
          },

          permissions: function permissions(role) {
            $log.debug('api.roles.permissions');
            $log.debug("Role", role);
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
              .then(function getRolesResponse(response) {
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
              .then(function getRolesResponse(response) {
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
              .then(function getRolesResponse(response) {
                return response.data;
              });
          }
        },

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
              .then(function getUsersResponse(response) {
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
              .then(function putUserResponse(response) {
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
              .then(function deleteUserResponse(response) {
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
              .then(function resetUserResponse(response) {
                return response.data;
              });
          },

          requestReset: function requestReset(userName) {
            $log.debug('api.users.reset');

            var request = {
              withCredentials: true,
              method: POST,
              url: usersResource().segment(userName).segment('request_reset').toString()
            };

            $log.debug('api.users.reset request', request);

            return $http(request)
              .then(function requestResetResponse(response) {
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
              .then(function getUserPermissionsResponse(response) {
                return response.data;
              });
          },

          savePermissions: function saveUserPermissions(user, permissions) {
            $log.debug('api.users.permissions');

            var request = {
              withCredentials: true,
              method: PUT,
              data: permissions,
              url: usersResource().segment(user).segment('permissions').toString()
            };

            $log.debug('api.users.savePermissions request', request);

            return $http(request)
              .then(function putUserPermissionsResponse(response) {
                return response.data;
              });
          }
        },

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
              .then(function getFavoritesResponse(response) {
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
              _.trigger(afterFavoritesUpdateEventKey);
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
              _.trigger(afterFavoritesUpdateEventKey);
            });
          },

          onUpdate: function onUpdate(handler) {
            _.on(afterFavoritesUpdateEventKey, handler);
          }
        },

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
              .then(function getPostsResponse(response) {
                return response.data;
              });
          }
        },

        categories: {

          create : function createSubcategory(parentPath, childName) {
            $log.debug("api.categories.createSubcategory",
              "ParentPath ", parentPath, "childName ", childName);
            var request = {
              withCredentials: true,
              method: POST,
              url: categoriesResource().segment('create').toString(),
              data: {parentPath: parentPath, childName: childName}
            };

            $log.debug('api.categorize.post request', request);

            return $http(request)
              .then(
              function createSuccess(response) {
                $log.debug("api.categories.createSubcategory success");
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function createError(response) {
                $log.debug("api.categories.createSubcategory failure");
                return response.data;
              }
            );

          },

          delete : function deleteCategory(path) {
            $log.debug("api.categories.delete", "path ", path);
            var request = {
              withCredentials: true,
              method: POST,
              url: categoriesResource().segment('delete').toString(),
              data: {path: path}
            };
            return $http(request)
              .then(
              function deleteSuccess(response) {
                $log.debug("api.categories.delete success");
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function createError(response) {
                $log.debug("api.categories.delete failure");
                return response.data;
              }
            );
          },
          rename : function renameCategory(path, name) {
            $log.debug("api.categories.rename",
              "path ", path, "name ", name);
            var request = {
              withCredentials: true,
              method: POST,
              url: categoriesResource().segment('create').toString(),
              data: {path: path, name: name}
            };
            return $http(request)
              .then(
              function renameSuccess(response) {
                $log.debug("api.categories.rename success");
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function createError(response) {
                $log.debug("api.categories.rename failure");
                return response.data;
              }
            );
          }
        },

        reports: {

          onUpdate: function onUpdate(handler) {
            _.on(afterReportUpdateEventKey, handler);
          },

          categorize: function categorizeReports(uri, name, categories, id) {
            $log.debug("api.reports.categorize", "report ID ", id, "report uri ", uri, " categories list ", categories);
            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('categories').toString(),
              data: {uri: uri, name: name, categories: categories, reportId: id }
            };

            $log.debug('api.categorize.post request', request);

            return $http(request)
              .then(
              function categorizeSuccess(response) {
                $log.debug("api.categorize.post success");
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function categorizeError(response) {
                $log.debug("api.categorize.post failure");
                return response.data;
              }
            );
          },

          uncategorize: function uncategorizeReports(reportId, uri, category) {
            $log.debug("report ID ", reportId, "uri", uri, " category ", category);
            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('uncategory').toString(),
              data: { category: category, uri: uri, reportId: reportId }
            };

            return $http(request)
              .then(
              function uncategorizeSuccess(response) {
                $log.debug("api.uncategorize.post success");
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              },
              function uncategorizeError(response) {
                $log.debug("api.uncategorize.post failure");
                return response.data;
              }
            );
          },

          editJSON: function editMetadata(reportId, uri, metadata) {
            $log.debug("report ID ", reportId, "uri", uri, " metadata ", metadata);
            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment("metadata").toString(),
              data: { id: reportId, uri: uri, metadata: metadata}
            };

            $log.debug('api.metadata.post request', request);

            return $http(request)
              .then(
              function categorizeSuccess(response) {
                $log.debug("api.editmetadata.post success");
                _.trigger(afterReportUpdateEventKey);
                return response.data;
              },
              function categorizeError(response) {
                $log.debug("api.editmetadata.post failure");
                return response.data;
              }
            );
          },

          deployReports : function  deployReports(reportList, organizationList){
            $log.debug("report list ", reportList, " organization list ", organizationList);
            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment('deployment').toString(),
              data: { reports: reportList, organizations: organizationList }
            };

            $log.debug('api.deployment.post request', request);

            return $http(request)
              .then(
              function deploymentSuccess(response) {
                return response.data;
              },
              function deploymentError(response) {
                return response.data;
              }
            );
          },

          update: function updateReport(reportId, reportUri, label, description){
            $log.debug('api.reports.update', reportId, reportUri, label, description);

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment(reportId).toString(),
              data: { type: 'edit', label: label, description: description }
            };
            $log.debug('api.reports.update request', request);
            var mocking = false;
            if (mocking) {
              return $timeout(
                function mockUpdateReportFailure() {
                  return  $q.reject({code: 'invalid_report_label'});
                });
            }
            else {
              var promise = $http(request)
                .then (
                function editSuccess(response) {
                  $log.debug("successfully edited report");

                  //remove the cached version of the report so it will reload
                  var cacheKey = 'report_' + reportUri;
                  cache.remove(cacheKey);
                  $log.debug('Removed report from cache:' + cacheKey);
                  _.trigger(afterReportUpdateEventKey)
                  _.trigger(afterNavigationUpdateEventKey);
                  return response.data;
                },
                function editError(response) {
                  var status = response.status;
                  var data = response.data;
                  // server error
                  if (status == 500) {
                    $log.error("500 error during custom report update");
                  }
                  // other errors
                  else {
                    $log.error (status, "error during custom report update");
                    $log.error ("Error data: ", data);
                  }
                  return data;
                }
              );
              return promise;
            }
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
              .then(function getReportsResponse(response) {
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
              .then(function deleteReportResponse(response) {
                _.trigger(afterNavigationUpdateEventKey);
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

            return $http(request)
              .then(function copyReportResponse(response) {
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              });
          }
        },

        jasper: {
          allReports: function getAllReports(){
            $log.debug('api.jasper.report.all');

            var request = {
              withCredentials: true,
              method: GET,
              url: jasperReportResource("all").toString()
            };

            $log.debug("all reports request ", request);
            return $http(request)
              .then(function (response) {
                $log.debug('Jasper Report', response.data);
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

            return $http(postR)
              .then(function (response) {
                $log.debug('Export Report data', response.data);
                return exportReportResource(reportUri).segment(response.data).toString();
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

              return $http(request)
                .then(function (response) {
                  $log.debug('Jasper Report', response.data);
                  cache.put(cacheKey, response.data);
                  $log.debug('Cached rport data:' + cacheKey);
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

            return $http(request)
              .then(function (response) {
                $log.debug('Jasper Report Data', response.data);
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

              return $http(request)
                .then(function (response) {
                  $log.debug('Jasper Report Input Controls', response.data);
                  cache.put(cacheKey, response.data);
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

