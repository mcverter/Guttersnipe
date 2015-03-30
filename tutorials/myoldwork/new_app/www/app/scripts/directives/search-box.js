(function (angular, app, _, $) {
  'use strict';

  app.directive('searchBox', ['$timeout', '$log',
    function ($timeout, $log) {
      return {
        restrict: 'E',
        templateUrl: 'views/directives/search-box.html',
        replace: true,
        scope: {
          callback: '&callback'
        },
        controller: ['$scope',
          function ($scope) {
            $scope.clear = function clearQuery($event) {
              $event.preventDefault();
              $scope.query = null;
            };

            $scope.$watch('query', function queryChanged(newValue, oldValue) {
              if (newValue !== oldValue) {
                $scope.callback({ query: (newValue || '').trim() });
              }
            });
          }]
      };
    }]);

})(window.angular, window.novantas, window._, window.jQuery);