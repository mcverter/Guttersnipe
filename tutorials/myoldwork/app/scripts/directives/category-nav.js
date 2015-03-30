(function (angular, app) {
  'use strict';
  app.directive('categoryNav', ['$log', '$category',
    function ($log, $category) {
      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: 'views/directives/category-nav.html',
        link: function (scope, element, attrs) {
          $log.debug('categoryNav.link', element);

          Object.defineProperties(scope, {
            categoryLink: {
              enumerable: true,
              get: function getCategoryLink() {
                var categoryId = scope.$eval(attrs.categoryId),
                    link = $category.link(categoryId);
                return link;
              }
            }
          });
        }
      };
    }]);

}) (window.angular, window.novantas);