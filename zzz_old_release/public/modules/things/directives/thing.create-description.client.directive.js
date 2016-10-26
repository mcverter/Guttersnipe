
(function () {
    'use strict';

    angular.module('things')
        .directive('createDescription', ['things_templates', function(templates) {
            var templateUrl = templates.main + 'thing.create-description.client.template.html';

            return {
                restrict: 'E',
                templateUrl: templateUrl,
                scope : {
                    confirmations: '=',
                    thing: '='
                }
            };
        }]
    );
})();



