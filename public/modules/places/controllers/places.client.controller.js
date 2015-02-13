'use strict';

// Places controller
angular.module('places').controller('PlacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Places',
    function($scope, $stateParams, $location, Authentication, Places) {
        $scope.authentication = Authentication;

        $scope.place = {
            isLocationSet: false,
            inputAddress: 'Prospect Park',
            center: {
                lat: 40.660204,
                lng: -73.968956,
                zoom: 14
            },
            description: '',
            markers: {
                mainMarker: {
                    lat: 40.660204,
                    lng: -73.968956,
                    focus: true,
                    draggable: true
                }
            },
            geocoder: {},
            google: google || {}
        };

}
]);