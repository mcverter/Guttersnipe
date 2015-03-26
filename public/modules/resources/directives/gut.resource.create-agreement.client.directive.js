(function (angular, _) { 'use strict';
    angular.module('resources')
        .directive('createAgreement', ['resource_templates', function(templates) {
            var linker = function(scope, element, attrs) {},
                controller = function($scope){},
                templateUrl = templates.main + 'resource-agreement.client.template.html';
            return {
                restrict: 'E',
                templateUrl: templateUrl,
                link: linker,
                controller: controller
            };
        }]
    );
})(window.angular,  window._);
