(function (angular, app) {
    'use strict';

//  var loginPath = '/security/login';

    window.guttersnipe =  angular.module('guttersnipe', [
        'ngRoute',
        'uiGmapgoogle-maps'

    /*
     'ngCookies',
     'ngAnimate',
     'debug',
     'app-config',
     'bootstrap',
     'google-visualization',
     'google-maps',
     'nvd3ChartDirectives'
     */
    ])
        /*
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
         })*/
        .config(['$routeProvider', 'uiGmapGoogleMapApiProvider',
            function config($routeProvider, uiGmapGoogleMapApiProvider) {

                uiGmapGoogleMapApiProvider.configure({
                    //    key: 'your api key',
                    v: '3.17',
                    libraries: 'weather,geometry,visualization'
                });

                /*
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
                 */
                $routeProvider

                    .when('/', {
                        templateUrl: 'js/partials/home.html',
                        controller: 'HomeCtrl'
                    })
                    .when('/register',{
                        templateUrl: 'js/partials/register.html',
                        controller: 'RegistrationCtrl'
                    })
                    .when('/edit_profile',{
                        templateUrl: 'js/partials/edit_profile.html',
                        controller: 'EditProfileCtrl'
                    })
                    .when('/create_report',{
                        templateUrl: 'js/partials/create_report.html',
                        controller: 'CreateReportCtrl'
                    })
                    .when('/login',{
                        templateUrl: 'js/partials/login.html',
                        controller: 'LoginCtrl'
                    })
                    .when('/logout',{
                        templateUrl: 'js/partials/logout.html',
                        controller: 'LogoutCtrl'
                    })
                    .when('/search',{
                        templateUrl: 'js/partials/search.html',
                        controller: 'SearchCtrl'
                    })
                    .when('/site{id}',{
                        templateUrl: 'js/partials/site.html',
                        controller: 'SiteCtrl'
                    })
                    .when('/admin/manage_data',{
                        templateUrl: 'js/partials/admin/manage_data.html',
                        controller: 'ManageDataCtrl'
                    })
                    .when('/admin/manage_users',{
                        templateUrl: 'js/partials/admin/manage_users.html',
                        controller: 'ManageUsersCtrl'
                    })
                    .when('/maps_example',{
                        templateUrl: 'js/partials/edit_profile.html',
                        controller: 'EditProfileCtrl'
                    })
                    .otherwise({
                        templateUrl: 'js/partials/home.html',
                        controller: 'HomeCtrl'
                    })
            }]);

    app = window.guttersnipe;


})(window.angular, window.guttersnipe);

