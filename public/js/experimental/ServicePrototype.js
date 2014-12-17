/**
 * Created by mitchell on 11/29/14.
 */
app.factory('geocodeService', ['$http',
    function ($http) {
        // return object
        var geocoder = {};

        var address = "73 St Pauls Place Brooklyn NY";
        var response = $http.get(
            "http://rpc.geocoder.us/service/csv?address=" + address).
            success(function(data, status, headers, config) {
                console.log("Success");
                console.log("Data", data);
            }).
            error(function(data, status, headers, config) {
                console.log("Error");
                console.log("Data", data);
            });

        // return object
        geocoder = Object.create(Object.prototype, {
            id: {
                enumerable: true,
                get: function getId() {
                    var self = this;
                    return self.data.id;

                },
                onLoad: {
                    enumerable: true,
                    value: function onLoad(handler) {
                        var self = this;

                        _.on(afterLoadEventKey, handler);

                        if (!_.isEmpty(reports)) {
                            $log.debug('Already loaded, triggering handler');
                            handler(self);
                        }
                    }
                }
            }});


        return geocoder;

    }])(window.angular, window.guttersnipe, window._);