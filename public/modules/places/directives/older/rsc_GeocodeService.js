(function (angular, app, _) {
    'use strict';
    app.factory('geocodeService', ['$http',
        function ($http) {
            // return object
            var geocoder = {};

            // return object
            geocoder = Object.create(Object.prototype, {});

            var address = '73 St Pauls Place Brooklyn NY';
            var request = {
                method: 'GET',
                url: 'http://www.google.com' //'rpc.geocoder.us/service/csv?address=' + address
            };



            $http.get('https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderService_V04_01.asmx')
                .success(function Response (response) {
                    console.log('Response');
                    console.log(response)
                });

            return geocoder;
        }]);
})(window.angular, window.guttersnipe, window._)
