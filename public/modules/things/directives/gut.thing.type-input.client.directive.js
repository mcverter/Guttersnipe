(function (angular, _) {
  'use strict';

  angular.module('things').directive('resourceTypeInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.type-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);


