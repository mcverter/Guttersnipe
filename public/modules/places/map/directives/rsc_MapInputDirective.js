(function (angular, _) { 'use strict';

angular.module('places')
    .directive('mapInput', ['places_templates', function(templates) {
        var templateUrl = templates.map + 'rsc_MapInputTemplate.html';

        return {
            restrict: 'E',
            templateUrl: templateUrl
        }
    }]);})(window.angular, window._)
