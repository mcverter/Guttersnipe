(function (angular, _) {
  'use strict';
  angular.module('things').directive('resourceType', ['things_templates', function(templates) {
      var templateUrl = templates.type + 'rsc_TypeMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: 'ThingsTaxonomyController'
      }
    }]
  );
})(window.angular,  window._);



