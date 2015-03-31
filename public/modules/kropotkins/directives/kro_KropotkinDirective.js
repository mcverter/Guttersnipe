(function () {
    'use strict';

    function kropotkinDirective (Kropotkins) {
        return {
            restrict: 'E',
            templateUrl:  'modules/kropotkins/templates/kropotkinDirective.view.html',
            controller: ['$scope', '$http', '$log',
                function ($scope, $http, $log) {
                    var loadQuote = function loadQuote() {
                        Kropotkins.getRandom()
                            .then(function(data) {
                                $scope.quote = data;
                                console.log($scope.quote);
                            }, function(err) {
                                console.log('Could not load quote', err);
                            });
                    };

                    loadQuote();

                    $scope.reloadQuote =  loadQuote;
                }]
        };
    }

    angular.module('kropotkins').directive('kropotkinQuote', ['Kropotkins', kropotkinDirective]);
})();
