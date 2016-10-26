(function () {
    'use strict';

    angular.module('resources')
        .directive('resourcesList', ['resource_templates', function(templates) {
            var templateUrl = templates.main + 'read/' + 'resources-list.client.template.html';

            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope: {
                    resources : '='
                }
            };
        }]
    );
})();

