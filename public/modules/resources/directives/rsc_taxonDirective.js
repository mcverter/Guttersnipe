(function (angular, app) {
  'use strict';

  app.directive('resourceTaxon', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_create_wizard + 'rsc_Taxon.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,

        link: function (scope, element, attrs) {
          scope.name = attrs.name;
        }
      }
    }]
  );
})(window.angular, window.guttersnipe);


