(function (angular, app) {
    'use strict';

    console.log("in the controller");
    app.controller('HomeCtrl', ['$scope', function ($scope) {
        console.log("in the home controller");
        $scope.foo = "mew";
    }]);
})(window.angular, window.guttersnipe);

