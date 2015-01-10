/*(function (angular, app) {
    'use strict';

    app.controller('MooController', [function () {
    }]);
})(window.angular, window.guttersnipe);

*/

var login = angular.module('LoginController', []);
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