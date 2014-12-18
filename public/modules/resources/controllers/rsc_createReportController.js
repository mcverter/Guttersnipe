(function (angular, app) {
    'use strict';

    app.controller('CreateReportController', ['$scope', 'ResourceTaxonomyService',
        function ($scope, ResourceTaxonomy) {
            console.log($scope);
            console.log(ResourceTaxonomy);
            $scope.resourceTaxonomy = ResourceTaxonomy.get();

    }]);
})(window.angular, window.guttersnipe);
