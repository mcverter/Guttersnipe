(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['common', 'datacontext'];

    function Dashboard(common, datacontext) {
        /*jshint validthis: true */
        var vm = this;
        var $q = common.$q;

        vm.map = {};
        vm.news = {};
        vm.speakers = {};
        vm.content = {};
        vm.title = 'Dashboard';

        activate();

        function activate() {
            setBasicData();
            var promises = [
                getAttendeeCount(),
                getSessionCount(),
                getSpeakers(),
                getTrackCounts()
            ];
//            TODO: Using a resolver on all routes or datacontext.ready in every controller
//            return datacontext.ready(promises).then(getSpeakerMetrics);
            return $q.all(promises).then(getSpeakerMetrics);
        }

        function getTrackCounts() {
            return datacontext.session.getSessionsPerTrack().then(function(trackMap) {
                vm.content.tracks = trackMap;
            });
        }

        function getSpeakerMetrics() {
            // Get all speakers from cache (they are local already)
            var speakers = datacontext.speaker.getAllLocal();
            vm.speakerCount = speakers.length;
            // Get top speakers (from local cache)
            vm.speakers.list = datacontext.speaker.getTopLocal();
        }

        function getSpeakers() {
            return datacontext.speaker.getPartials();
        }

        function getAttendeeCount() {
            return datacontext.attendee.getCount().then(function(data) {
                vm.attendeeCount = data;
                return vm.attendeeCount;
            });
        }

        function getSessionCount() {
            return datacontext.session.getCount().then(function(data) {
                vm.sessionCount = data;
                return vm.sessionCount;
            });
        }

        function setBasicData() {
            vm.map = {
                title: 'Location'
            };
            vm.news = {
                title: 'Code Camp',
                description: 'Code Camp is a community event where developers ' +
                    'learn from fellow developers. All are welcome to attend and ' +
                    'speak. Code Camp is free, by and for the developer community, ' +
                    ' and occurs on the weekends.'
            };
            vm.speakers = {
                interval: 5000,
                list: [],
                title: 'Top Speakers'
            };
            vm.content = {
                predicate: '',
                reverse: false,
                setSort: setContentSort,
                title: 'Content',
                tracks: []
            };
        }

        function setContentSort(prop) {
            vm.content.predicate = prop;
            vm.content.reverse = !vm.content.reverse;
        }
    }
})();