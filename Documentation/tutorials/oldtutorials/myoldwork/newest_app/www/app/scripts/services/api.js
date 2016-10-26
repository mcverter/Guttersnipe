(function (angular, app, _, btoa, URI) {
  'use strict';

  app.factory('$api', ['$log', '$debug', '$timeout', '$config', '$http',

    function ($log, $debug, $timeout, $config, $http) {

      var GET = 'GET',
          PUT = 'PUT',
          POST = 'POST',
          DELETE = 'DELETE',
          api,
          state = {},
          salesscapeUri = URI($config.apiHost).segment('salesscape').segment('v1'),
          salesscapeResource = function salesscapeResource() {
            return salesscapeUri.clone();
          },
          navigationUri = salesscapeResource().segment('navigation'),
          navigationResource = function navigationResource() {
            return navigationUri.clone();
          },
          favoritesUri = salesscapeResource().segment('favorites'),
          favoritesResource = function favoritesResource() {
            return favoritesUri.clone();
          },
          viewingHistoryUri = salesscapeResource().segment('views'),
          viewingHistoryResource = function viewingHistoryResource() {
            return viewingHistoryUri.clone();
          },
          postsUri = salesscapeResource().segment('posts'),
          postsResource = function postsResource() {
            return postsUri.clone();
          },
          reportsUri = salesscapeResource().segment('reports'),
          reportsResource = function reportsResource() {
            return reportsUri.clone();
          },
          jasperUri = salesscapeResource().segment('jasper'),
          jasperResource = function jasperResource() {
            return jasperUri.clone();
          },
          jasperReportsUri = jasperResource().segment('reports'),
          jasperReportResource = function jasperReportResource(reportUri) {
            return jasperReportsUri.clone().segment(reportUri).normalizePathname();
          },
          afterLoginEventKey = '$api.afterLogin',
          afterLogoutEventKey = '$api.afterLogout',
          afterViewingHistoryUpdateEventKey = '$api.afterViewingHistoryUpdate',
          afterFavoritesUpdateEventKey = '$api.afterFavoritesUpdate',
          afterNavigationUpdateEventKey = '$api.afterNavigationUpdate';

      api = {
        $login: function (username, password, organization) {
          $log.debug('api.$login', username, organization);

          var request = {
                withCredentials: true,
                method: GET,
                url: salesscapeResource().segment('login').toString()
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

        $logout: function () {
          $log.debug('api.$logout');

          var request = {
                withCredentials: true,
                method: GET,
                url: salesscapeResource().segment('logout').toString()
          };

          $log.debug('api.$logout request', request);

          return $http(request)
              .then(function () {
                $log.debug('Logged Out');
                state = {};
                _.trigger(afterLogoutEventKey);
              });
        },

        onLogout: function onLogout(handler) {
          _.on(afterLogoutEventKey, handler);
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

        reports: {
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

          copy: function copyReport(reportId, label) {
            $log.debug('api.reports.copy', reportId, label);

            var request = {
              withCredentials: true,
              method: POST,
              url: reportsResource().segment(reportId).toString(),
              data: { type: 'copy', label: label }
            };

            return $http(request)
              .then(function copyReportResponse(response) {
                _.trigger(afterNavigationUpdateEventKey);
                return response.data;
              });
          }
        },

        jasper: {
          report: function (reportUri) {
            $log.debug('api.jasper.report', reportUri);

            var request = {
                  withCredentials: true,
                  method: GET,
                  url: jasperReportResource(reportUri).toString()
                };

            return $http(request)
                .then(function (response) {
                  $log.debug('Jasper Report', response.data);
                  return response.data;
                });
          },

          cachedData: _.memoize(
            function(reportUri, parameters){
              return this.data(reportUri, parameters);
            }, function (reportUri, parameters) {
              return JSON.stringify({ uri: reportUri, parameters: parameters});
            }
          ),
          
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

            var request = {
                  withCredentials: true,
                  method: GET,
                  url: jasperReportResource(reportUri).segment('controls').toString()
                };

            return $http(request)
                .then(function (response) {
                  $log.debug('Jasper Report Input Controls', response.data);
                  return response.data;
                });
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

