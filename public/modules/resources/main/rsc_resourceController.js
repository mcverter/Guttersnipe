(function (angular, app) {
  'use strict';

  app.controller('ResourceController', ['$scope', 'ResourceTaxonomyService', '$log',
    function ($scope, ResourceTaxonomyService, $log){
      $scope.resourceTaxonomy = ResourceTaxonomyService;
      $scope.topLevel = ResourceTaxonomyService.topLevel;
      $log.debug("scope is", $scope);
      1+1;
    }]);
})(window.angular, window.guttersnipe);
