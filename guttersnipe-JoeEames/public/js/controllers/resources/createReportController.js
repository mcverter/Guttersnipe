(function (angular, app) {
    'use strict';

    app.controller('CreateReportCtrl', ['$scope', 'ResourceTaxonomyService',
        function ($scope, ResourceTaxonomy) {
            console.log($scope);
            console.log(ResourceTaxonomy);
            $scope.resourceTaxonomy = ResourceTaxonomy.get();

    }]);
})(window.angular, window.guttersnipe);
