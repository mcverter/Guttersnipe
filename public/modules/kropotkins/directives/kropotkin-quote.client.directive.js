(function () {
    'use strict';

    // controller
    function KropotkinAnarchyIsOrder ($scope, Kropotkins) {
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
    }


    function kropotkinDirective () {
        return {
            restrict: 'E',
            templateUrl:  'modules/kropotkins/templates/kropotkinDirective.view.html',
            controller: ['$scope', 'Kropotkins',
                KropotkinAnarchyIsOrder ($scope, Kropotkins)]
        };
    }

    angular.module('kropotkins').directive('kropotkinQuote', ['Kropotkins', kropotkinDirective]);
})();
