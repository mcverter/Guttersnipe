'use strict';

angular.module('places')
    .directive('mapInput', ['templates', function(templates) {
        var templateUrl = templates.map + 'rsc_MapInputTemplate.html';

        return {
            restrict: 'E',
            templateUrl: templateUrl
        }
    }]);
