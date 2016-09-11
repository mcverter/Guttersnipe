(function () {
    'use strict';

    angular.module('resources')
        .directive('timeFull', ['times_templates', function(templates) {
            var templateUrl = templates.main + 'time-full.client.template.html';

            return {
                scope : {
                    time: '='
                },
                restrict: 'E',
                templateUrl: templateUrl
            };
        }]
    )
        .directive('timeSmall', ['times_templates', function(templates) {
            var templateUrl = templates.main + 'time-small.client.template.html';

            return {
                scope : {
                    time: '='
                },
                restrict: 'E',
                templateUrl: templateUrl
            };
        }]
    );
})();

