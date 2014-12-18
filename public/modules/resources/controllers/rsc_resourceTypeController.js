(function (angular, app) {
    'use strict';

    app.controller('ResourceTypeController', ['$scope', 'ResourceTaxonomyService',
        function ($scope, ResourceTaxonomy) {
            console.log($scope);
            console.log(ResourceTaxonomy);
            $scope.resourceTaxonomy = ResourceTaxonomy.get();
            console.log($scope.resourceTaxonomy);
            var a = 5;
    }]);
})(window.angular, window.guttersnipe);
