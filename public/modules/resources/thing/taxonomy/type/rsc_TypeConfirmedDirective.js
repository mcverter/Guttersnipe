(function (angular, app) {
  'use strict';

  app.directive('resourceTypeConfirmed', ['filePaths', function(filePaths) {

      var template =
        '      <div>' +
        '        <h2> The resource type is {{type}} </h2>' +
        '      </div>';

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


