(function () {
  'use strict';

  angular.module('resources')
      .directive('gutThingFull', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing-full.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '='
        }
      };
    }]
  )
    .directive('gutThingSmall', ['things_templates', function(templates) {
            var templateUrl = templates.main + 'thing-small.client.template.html';

            return {
                scope : {
                    thing: '='
                },
                restrict: 'E',
                templateUrl: templateUrl
            };
        }]
    );
})();

