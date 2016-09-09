/**
 * Created by mitchell_verter on 9/9/16.
 */
(function () {
    'use strict';

    angular
        .module('kropotkins')
        .directive('kropotkinQuote', kropotkinDirective)
        .controller('KropotkinAnarchyIsOrder', KropotkinAnarchyIsOrder);

    function kropotkinDirective () {
        return {
            restrict: 'E',
            templateUrl:  'modules/kropotkins/templates/kropotkinDirective.view.html',
            controller: 'KropotkinAnarchyIsOrder'
        };
    }

    KropotkinAnarchyIsOrder.$inject = ['$scope', 'Kropotkins'];

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
})();

/* OR */
var foo = {controller: ['$scope', 'Kropotkins', KropotkinAnarchyIsOrder]}
