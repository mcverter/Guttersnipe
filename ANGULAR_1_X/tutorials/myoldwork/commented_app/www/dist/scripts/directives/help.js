(function (angular, app, _, $) {
  'use strict';

  app.directive('help', ['$timeout', '$log',
    function ($timeout, $log) {
      return {
        restrict: 'E',
        templateUrl: 'bower_components/novafoundation/app/views/directives/help.html',
        replace: true,
        scope: true,
        link: function(scope, elem, attrs) {
          scope.topic = attrs.topic;
          scope.position = attrs.position || 'right';
          scope.show = scope.$eval(attrs.show || 'false');
          
          attrs.$observe('topic', function(nv){
            scope.topic = attrs.topic;
          });
        }
      };
    }]);

})(window.angular, window.novantas, window._, window.jQuery);