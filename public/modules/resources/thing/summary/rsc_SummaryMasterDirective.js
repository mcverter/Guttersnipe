(function (angular, app) {
  'use strict';

  app.directive('resourceSummary', ['filePaths', function(filePaths) {
      var template = multiline(/*
       <div ng-if="!isSummarySet">
          <resource-summary-input></resource-summary-input>
       </div>
       <div ng-if="isSummarySet">
          <resource-summary-confirmed></resource-summary-confirmed>
       </div>
       */);

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


