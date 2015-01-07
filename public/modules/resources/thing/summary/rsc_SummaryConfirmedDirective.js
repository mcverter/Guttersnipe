(function (angular, app) {
  'use strict';

  app.directive('resourceSummaryConfirmed', ['filePaths', function(filePaths) {
      var template =
        '      <div>' +
        '        <div>' +
        '          <h2> Headline </h2> {{headline}}' +
        '          <h2> Summary </h2> {{description}}' +
        '        </div>' +
        '        <a class="btn btn-warning" href="#" role="button" ng-click="isSummarySet=false">Edit</a>' +
        '      </div>' ;

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


