(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeagueShellCtrl', LeagueShellCtrl);

    LeagueShellCtrl.$inject = ['$state', '$stateParams'];

    function LeagueShellCtrl($state, $stateParams) {
        /* jshint validthis:true */
        var vm = this;
        vm.leagueId = $stateParams.leagueId;
        vm.tabs = [
            { text: 'Teams', state: 'league.teams' },
            { text: 'Games', state: 'league.games' },
            { text: 'Home', state: 'league.home' }
        ];

        activate();

        function activate() {
            _.each(vm.tabs, function (tab) {
                tab.active = ($state.current.name === tab.state);
            });
        }
    }
})();