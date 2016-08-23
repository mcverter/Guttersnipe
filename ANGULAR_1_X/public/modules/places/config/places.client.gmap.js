(function () {
    'use strict';

//Setting up route
    angular.module('places')
        .config(['uiGmapGoogleMapApiProvider',
            function(uiGmapGoogleMapApiProvider) {
                // Places state routing
                uiGmapGoogleMapApiProvider.configure({
                   v: '3.1.7'
                    // , key:
                    // , libraries:
                });
            }
        ]);
})();
