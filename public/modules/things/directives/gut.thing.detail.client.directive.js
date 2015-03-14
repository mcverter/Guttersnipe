(function (angular, _) {
  'use strict';

  angular.module('resources').directive('detail', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.detail.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '=',
          value: '='
        }
      };
    }]
  );
})(window.angular, window._);

