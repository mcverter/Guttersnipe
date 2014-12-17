(function (angular, app, _) {
    'use strict';

    app.controller('ControllerPrototype', ['$scope', '$log', 'geocodeService',
        function ($scope, $log, geocodeService) {
            var categoryId = $routeParams.categoryId,
                favorite,
                saveControlValues = function(){
                    var args = {};

                    _.each(components, function(c){
                        if (_.isFunction(c.saveValues))
                            c.saveValues(args);
                    });

                    $location.search(args);
                    $location.replace();
                },
                reportId = $routeParams.reportId;

            // setup scope
            Object.defineProperties($scope, {
                categoryId: {
                    enumerable: true,
                    get: function getCategoryId() {
                        return categoryId;
                    }
                },

                report: {
                    enumerable: true,
                    get: function getReport() {
                        return report;
                    }
                }});
            $scope.$watch('parameters', function (newValue, oldValue) {
                if (newValue !== oldValue || forceUpdate) {
                    if (filterApplied)
                        updateTable($scope.parameters);
                    updateExportParameters($scope.parameters);
                }
            });

            function getFilterValue(value, type) {
            }
        }])
}) (window.angular, window.guttersnipe, window._);
