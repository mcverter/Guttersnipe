var login = angular.module('LoginCtrl', []);
login.controller('LoginController', function($scope, $location, Login, SessionService){
    $scope.loginSubmit = function(){
        console.dir($scope.loginData);
        var auth = Login.auth($scope.loginData);
        auth.success(function(response){
            if (response.id) {
                SessionService.set('auth', true);
            }
            else {
                alert('could not verify your login');
            }
        });
    }
});