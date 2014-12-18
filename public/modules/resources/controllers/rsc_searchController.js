(function (angular, app) {
    'use strict';

    app.controller('SearchController', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {
        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        });

    }]);
})(window.angular, window.guttersnipe);

