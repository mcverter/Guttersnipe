(function () {
    'use strict';

    angular
        .module('app.speaker')
        .controller('Speakers', Speakers);

    Speakers.$inject = ['$location', 'common', 'config', 'datacontext'];

    function Speakers($location, common, config, datacontext) {
        /*jshint validthis: true */
        var vm = this;

        var keyCodes = config.keyCodes;

        // Define viewmodel variables
        vm.filteredSpeakers = [];
        vm.gotoSpeaker = gotoSpeaker;
        vm.refresh = refresh;
        vm.search = search;
        vm.speakerSearch = '';
        vm.speakers = [];
        vm.title = 'Speakers';

        // Kickoff functions
        activate();

        function activate() {
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready([getSpeakers()]);
            return getSpeakers();
        }

        function applyFilter() {
            vm.filteredSpeakers = vm.speakers.filter(speakerFilter);
        }

        function getSpeakers(forceRefresh) {
            return datacontext.speaker.getPartials(forceRefresh).then(function (data) {
                // We don't handle the 'fail' because the datacontext will handle the fail.
                vm.speakers = data;
                applyFilter();
                return data;
            });
        }

        function gotoSpeaker(speaker) {
            if (speaker && speaker.id) {
                $location.path('/speaker/' + speaker.id);
            }
        }

        function refresh() {
            getSpeakers(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.speakerSearch = '';
            }
            applyFilter();
        }

        function speakerFilter(speaker) {
            var isMatch = vm.speakerSearch ? common.textContains(speaker.fullName, vm.speakerSearch) : true;
            //if (isMatch) { vm.filteredCount++; }
            return isMatch;
        }
    }
})();