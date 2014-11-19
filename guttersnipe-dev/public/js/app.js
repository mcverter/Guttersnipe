var app = angular.module('blogApp', ['ngRoute', 'LoginCtrl', 'AuthSrv']);
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'js/partials/home.html',
            controller: 'HomeController'
        })
        .when('register',{
            templateUrl: 'js/partials/register.html',
            controller: 'RegistrationController'
        })
        .when('edit_profile',{
            templateUrl: 'js/partials/edit_profile.html',
            controller: 'EditProfileController'
        })
        .when('create_report',{
            templateUrl: 'js/partials/create_report.html',
            controller: 'RegistrationController'
        })
        .when('login',{
            templateUrl: 'js/partials/login.html',
            controller: 'LoginController'
        })
        .when('logout',{
            templateUrl: 'js/partials/logout.html',
            controller: 'LogoutController'
        })
        .when('search',{
            templateUrl: 'js/partials/search.html',
            controller: 'SearchController'
        })
        .when('site{id}',{
            templateUrl: 'js/partials/site.html',
            controller: 'SiteController'
        })
        .when('admin/manage_data',{
            templateUrl: 'js/partials/admin/manage_data.html',
            controller: 'ManageDataController'
        })
        .when('admin/manage_users',{
            templateUrl: 'js/partials/admin/manage_users.html',
            controller: 'ManageUsersController'
        })

});



app.run(function() {

});
