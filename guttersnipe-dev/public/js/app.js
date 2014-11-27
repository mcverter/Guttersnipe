(function (angular, app) {
    'use strict';

    window.guttersnipe = app || angular.module('guttersnipe', [
        'ui.router',
        'leaflet-directive',
        'mgo-angular-wizard',
        'ui.calendar',
//        'ui.bootstrap',
        'debug',
        'bootstrap'
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
        .config(['$stateProvider', '$urlRouterProvider',
            function config($stateProvider, $urlRouterProvider) {
              //  $urlRouterProvider.otherwise("/home");

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'js/templates/home.html',
                        controller: 'HomeCtrl'
                    })
                    .state( 'wizard', {
                        url:'/wizard',
                        templateUrl: 'js/templates/wizard.html',
                        controller: 'WizardCtrl'
                    })
                    .state('wizard2', {
                        url: '/wizard2',
                        templateUrl: 'js/templates/wizard2.html',
                        controller: 'Wizard2Ctrl'
                    })
                    .state('register',{
                        url: '/register',
                        templateUrl: 'js/templates/register.html',
                        controller: 'RegistrationCtrl'
                    })
                    .state('edit_profile',{
                        url: '/edit_profile',
                        templateUrl: 'js/templates/edit_profile.html',
                        controller: 'EditProfileCtrl'
                    })
                    .state('create_report',{
                        url: '/create_report',
                        templateUrl: 'js/templates/create_report.html',
                        controller: 'CreateReportCtrl'
                    })

                    .state('resource_type',{
                        url: '/resource_type',
                        templateUrl: 'js/templates/resource_type.html',
                        controller: 'ResourceTypeCtrl'
                    })
                    .state('resource_details',{
                        url: '/resource_details',
                        templateUrl: 'js/templates/resource_details.html',
                        controller: 'ResourceDetailsCtrl'
                    })

                    .state('login',{
                        url: '/login',
                        templateUrl: 'js/templates/login.html',
                        controller: 'LoginCtrl'
                    })
                    .state('logout',{
                        url: '/logout',
                        templateUrl: 'js/templates/logout.html',
                        controller: 'LogoutCtrl'
                    })
                    .state('search',{
                        url: '/search',
                        templateUrl: 'js/templates/search.html',
                        controller: 'SearchCtrl'
                    })
                    .state('site{id}',{
                        url: '/site{id}t',
                        templateUrl: 'js/templates/site.html',
                        controller: 'SiteCtrl'
                    })
                    .state('manage_data',{
                        url: '/admin/manage_data',
                        templateUrl: 'js/templates/admin/manage_data.html',
                        controller: 'ManageDataCtrl'
                    })
                    .state('manage_users',{
                        url: '/admin/manage_users',
                        templateUrl: 'js/templates/admin/manage_users.html',
                        controller: 'ManageUsersCtrl'
                    })

                ;
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
            }]);

    app = window.guttersnipe;


})(window.angular, window.guttersnipe);

