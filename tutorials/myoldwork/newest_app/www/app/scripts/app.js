(function (angular, app, _) {
  'use strict';

  var loginPath = '/security/login';

  window.novantas = app || angular.module('novantas', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'debug',
    'app-config',
    'bootstrap',
    'google-visualization',
    'google-maps',
    'nvd3ChartDirectives'
  ])
  .provider('authResponseInterceptor', function authResponseInterceptor() {
    var self = this;
    self.$get = ['$log', '$injector', '$location', '$q',
      function $get($log, $injector, $location, $q) {
        return {
          responseError: function responseError(rejection) {
            // using $injector to avoid circular dependency authResponseInterceptor > $http > $api > $http
            return $injector.invoke(['$api',
              function ($api) {
                if (rejection.status === 401 && $location.path() !== loginPath) {
                  $log.warn('Not Authorized (HTTP 401), clearing session and returning to login page');
                  $api.$logout().then(function redirectAfter401() {
                    var returnTo = $location.search('returnTo', null).url();
                    $location.search('returnTo', returnTo).path('/security/login');
                  });
                }

                return $q.reject(rejection);
              }]);
          }
        };
      }];
  })
  .config(['$locationProvider', '$httpProvider', '$routeProvider',
    function config($locationProvider, $httpProvider, $routeProvider) {
      var authRequiredFilter = ['$log', '$user',
        function checkAuth($log, $user) {
          $log.debug('Checking Authorization', $user.current);

          if (!$user.current) {
            return $user.$login();
          }
        }],
        secureRoute = function secureRoute(props) {
          var def = {
            resolve: { authFilter: authRequiredFilter },
            reloadOnSearch: false,
            secure: true
          };

          return _.extend(def, props);
        };

      $routeProvider
        .when(loginPath, { templateUrl: 'views/auth.html' })
        .when('/', secureRoute({ templateUrl: 'views/home.html', controller: 'HomeCtrl' }))
        .when('/settings/account', secureRoute({ templateUrl: 'views/user-settings.html', controller: 'UserSettingsCtrl' }))
        .when('/settings/admin', secureRoute({ templateUrl: 'views/user-admin.html', controller: 'UserAdminCtrl' }))
        .when('/settings/permissions', secureRoute({ templateUrl: 'views/permissions.html', controller: 'PermissionsCtrl' }))
        .when('/analytics/custom', secureRoute({ templateUrl: 'views/custom-reports.html', controller: 'CustomReportsCtrl' }))
        .when('/analytics/custom/adhoc/:reportId', secureRoute({ templateUrl: 'views/adhoc.html', controller: 'AdhocCtrl' }))
        .when('/analytics/custom/:reportId', secureRoute({ templateUrl: 'views/report.html', controller: 'ReportCtrl' }))
        .when('/analytics/reports/:categoryId', secureRoute({ templateUrl: 'views/category.html', controller: 'CategoryCtrl' }))
        .when('/analytics/reports/:categoryId/:reportId', secureRoute({ templateUrl: 'views/report.html', controller: 'ReportCtrl' }))
        .when('/analytics/reports/:categoryId/:subcategoryId/:reportId', secureRoute({ templateUrl: 'views/report.html', controller: 'ReportCtrl' }))
        .otherwise({ redirectTo: '/' });

      $locationProvider.html5Mode(true).hashPrefix('!');

      $httpProvider.interceptors.push('authResponseInterceptor');
    }]);

  app = window.novantas;

})(window.angular, window.novantas, window._);