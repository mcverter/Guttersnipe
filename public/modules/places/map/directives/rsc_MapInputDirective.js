'use strict';

angular.module('places')
    .directive('mapInput', ['TEMPLATE_DIR', function(TEMPLATE_DIR) {
        var templateUrl = TEMPLATE_DIR + 'rsc_MapInputTemplate.html';

        return {
            restrict: 'E',
            templateUrl: templateUrl
        }
    }]);
