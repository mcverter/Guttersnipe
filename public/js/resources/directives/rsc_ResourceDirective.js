/**
 * Created by mitchell on 11/24/14.
 */

(function (angular, app) {
    'use strict';

    var BASE_ROUTE ='js/directives/templates/';

    app.directive('resourceCreateAgreementTerms', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'AgreementPage.html',
            controller = function($scope){};
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });

    app.directive('resourceCreateInstructions', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'InstructionsPage.html',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            template: templateUrl,
            controller: controller
        };
    });

    app.directive('kropotkinQuote', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'KropotkinQuote.html',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });


    app.directive('locationSearch', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'LocationSearch.html',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });

    app.directive('mapConfirm', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'MapPage.html',
            controller = function homeController() {
                $scope.center = {
                    lat: 40.095,
                    lng: -3.823,
                    zoom: 4
                };
                $scope.amsterdam = {
                    lat: 52.35,
                    lng: 4.91,
                    zoom: 12
                };

                $scope.legend = {
                    position: 'bottomleft',
                    colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                    labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
                };
                $scope.defaults = {
                    tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    tileLayerOptions: {
                        opacity: 0.9,
                        detectRetina: true,
                        reuseTiles: true
                    },
                    scrollWheelZoom: false
                };
                $scope.osloCenter = {
                    lat: 59.91,
                    lng: 10.75,
                    zoom: 12
                };
                $scope.markers = {
                    osloMarker: {
                        lat: 59.91,
                        lng: 10.75,
                        message: "I want to travel here!",
                        focus: true,
                        draggable: false
                    }
                };
                $scope.london = {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 8
                };
                $scope.foo = "mew";
            };

        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });

    app.directive('type', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'ResourceGeneral.html',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });

    app.directive('resourceDetails', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'TypePage.html',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });




    /*
     app.directive('resource', function() {
     var linker = function(scope, element, attrs) {

     },  templateUrl = BASE_ROUTE + '',
     controller = function($scope){

     };

     return {
     link: linker,
     restrict: 'E',
     templateUrl: templateUrl,
     controller: controller
     };
     });

     app.directive('type', [function () {
     var linker = function(scope, element, attrs) {

     };
     var  templateUrl = BASE_ROUTE + '';
     var controller = function($scope){

     };


     return {
     link: linker,
     restrict: 'A',
     templateUrl:  templateUrl
     };
     }]);

     app.directive('resourceSubtype', [function () {
     var linker = function(scope, element, attrs) {

     };
     var  templateUrl = BASE_ROUTE + '';

     return {
     link: linker,
     restrict: 'A',
     templateUrl:  templateUrl,
     };
     }]);

     app.directive('ResourceDirective', [function () {
     var linker = function(scope, element, attrs) {

     };
     var template = ' <label class="checkbox-inline">\
     <input type="checkbox" name="{{resource.resourceName}}" value="{{resource.resourceName}}-div"> {{resource.resourceLabel }} \
     </label> ';


     return {
     link: linker,
     restrict: 'ACE',
     template:  template
     };
     }]);
     */
})(window.angular, window.guttersnipe);
