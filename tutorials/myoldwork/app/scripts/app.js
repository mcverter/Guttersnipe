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
      var authRequiredFilter = ['$log', '$user', '$nav', '$location', '$route', '$api',
        function checkAuth($log, $user, $nav, $location, $route, $api) {
          $log.debug('Checking Authorization', $user.current);
          if (!$user.current)
            return $user.$login();
          
          var path = $location.path();
          var linkPath = path.substring(1);
          
          if (isAllowedLink(linkPath)){
            $api.logEvent({location:path, entryType:'Navigation'});
            return;
          }
          
          //ensure user has permission to link
          if (linkPath && !$nav.links[linkPath]){
            $location.path('/');
            return;
          }
            
          //then look for redirects
          var link = $nav.links[linkPath];
          var route = $route.routes['/' + linkPath];
          if (!link || !route || !route.redirectToChild){
            $api.logEvent({location:path, entryType:'Navigation'});
            return;
          }

          if (link.children && link.children.length)
            $location.path('/' + link.children[0].path);
          else
            $location.path('/');
          
        }],
        isAllowedLink = function(link){
          //allow special handling of valid routes not in link table (e.g. dyanmic routes)
          if (link.indexOf('analytics/custom/adhoc') == 0)
            return true;
          
          return false;
        },
        secureRoute = function secureRoute(props) {
          var def = {
            resolve: { authFilter: authRequiredFilter },
            reloadOnSearch: false,
            secure: true
          };

          return _.extend(def, props);
        };

      $routeProvider
        .when(loginPath, { templateUrl: 'views/auth.html', controller: 'AuthCtrl' })
        .when('/', secureRoute({ templateUrl: 'views/home.html', controller: 'HomeCtrl' }))
        
        .when('/analytics/custom', secureRoute({ templateUrl: 'views/custom-reports.html', controller: 'CustomReportsCtrl' }))
        .when('/analytics/custom/adhoc/:reportId', secureRoute({ templateUrl: 'views/adhoc.html', controller: 'AdhocCtrl' }))
        .when('/analytics/custom/:reportId', secureRoute({ templateUrl: 'views/report.html', controller: 'ReportCtrl' }))
        .when('/analytics/reports/:categoryId', secureRoute({ templateUrl: 'views/category.html', controller: 'CategoryCtrl' }))
        .when('/analytics/reports/:categoryId/:reportId', secureRoute({ templateUrl: 'views/report.html', controller: 'ReportCtrl' }))
        .when('/analytics/reports/:categoryId/:subcategoryId/:reportId', secureRoute({ templateUrl: 'views/report.html', controller: 'ReportCtrl' }))

        .when('/admin/users', secureRoute({ templateUrl: 'views/admin/users.html', controller: 'AdminUsersCtrl' }))
        .when('/admin/roles', secureRoute({ templateUrl: 'views/admin/roles.html', controller: 'AdminRolesCtrl' }))
        .when('/admin/deploy', secureRoute({ templateUrl: 'views/admin/deploy.html', controller: 'AdminDeployCtrl' }))
        .when('/admin/metadata', secureRoute({ templateUrl: 'views/admin/metadata.html', controller: 'AdminMetadataCtrl' }))
        .otherwise({ redirectTo: '/' });

      $locationProvider.html5Mode(true).hashPrefix('!');

      $httpProvider.interceptors.push('authResponseInterceptor');
    }]);

  app = window.novantas;

})(window.angular, window.novantas, window._);