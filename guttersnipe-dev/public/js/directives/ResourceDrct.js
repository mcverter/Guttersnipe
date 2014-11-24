/**
 * Created by mitchell on 11/24/14.

 <roadrunneratwast> var name = "Foo"; obj[name] = function(){} . That will produce a Foo?

 <Havvy> roadrunneratwast:  obj["Produce" + x] = function () {}
 */

(function (angular, app) {
    'use strict';

    app.directive('resource', function() {
        var linker = function(scope, element, attrs) {

            }, template = '',
            controller = function($scope){

            };

        return {
            link: linker,
            restrict: 'E',
            template: template,
            controller: controller
        };
    });

    app.directive('resourceType', [function () {
        var linker = function(scope, element, attrs) {

        };
        var template = '';
        var controller = function($scope){

        };


        return {
            link: linker,
            restrict: 'A',
            template:  template
        };
    }]);

    app.directive('resourceSubtype', [function () {
        var linker = function(scope, element, attrs) {

        };
        var template = '';

        return {
            link: linker,
            restrict: 'A',
            template:  template
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
