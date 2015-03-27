(function () {
    'use strict';

    angular.module('resources')
        .directive('resourcesList', ['resource_templates', function(templates) {
            var templateUrl = templates.main + 'resources-list.client.template.html';

            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    resources : '='
                }
            };
        }]
    )
        .directive('resourcesMap', ['resource_templates', function(templates) {
            var templateUrl = templates.main + 'resources-map.client.template.html';

            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    resources : '='
                }

            };
        }]
    )

        .directive('resourcesCalendar', ['resource_templates', function(templates) {
            var templateUrl = templates.main + 'resources-calendar.client.template.html';

            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    resources : '='
                }

            };
        }]
    )



    ;
})();

