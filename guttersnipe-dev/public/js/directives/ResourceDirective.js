/**
 * Created by mitchell on 11/24/14.
 */

(function (angular, app) {
    'use strict';

    var BASE_ROUTE ='js/directives/templates/';

    app.directive('resourceCreateAgreementTerms', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + 'ResourceCreateAgreement.html',
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
            templateUrl = BASE_ROUTE + 'ResourceCreateAgreement.html',
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
            templateUrl = BASE_ROUTE + '',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });


    app.directive('locationSearchDiv', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + '',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });

    app.directive('resourceIdGeneral', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + '',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });

    app.directive('resourceIdSpecific', function() {
        var linker = function(scope, element, attrs) {},
            templateUrl = BASE_ROUTE + '',
            controller = function($scope){ };
        return {
            link: linker,
            restrict: 'E',
            templateUrl: templateUrl,
            controller: controller
        };
    });





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

    app.directive('resourceType', [function () {
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


})(window.angular, window.guttersnipe);
