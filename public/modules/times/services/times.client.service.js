(function () {
    'use strict';

    function TimeService() {
        var timeFactory = {
            emptyTime: getEmptyTime,
            transformOneTime: transformSchedulesFromServerToClient,
            transformAllTimes: transformAllResponseSchedules,
            createCalendarFromResources : createCalendarFromResources
        }

        function createCalendarFromResources(data) {

        }
        function getEmptyTime() {
            return {
                schedules: [],
                notes: ''
            }

        }

        function transformSchedulesFromServerToClient(schedules) {
            _.forEach(schedules, function(sked){
                var startTime = Number(sked.startTime);

                if(startTime < 1200 ) {
                    startTime = startTime + ' AM';
                } else {
                    if (startTime > 1300) {
                        startTime -= 1200;
                    }
                    startTime = startTime + ' PM';
                }
                sked.startTime = startTime;

                switch(sked.recurringDay) {
                    case "all":
                        sked.recurringDay = "day";
                        break;
                    case "mon":
                        sked.recurringDay = "Monday";
                        break;
                    case "tue":
                        sked.recurringDay = "Tuesday";
                        break;
                    case "wed":
                        sked.recurringDay = "Wednesday";
                        break;
                    case "thu":
                        sked.recurringDay = "Thursday";
                        break;
                    case "fri":
                        sked.recurringDay = "Friday";
                        break;
                    case "sat":
                        sked.recurringDay = "Saturday";
                        break;
                    case "sun":
                        sked.recurringDay = "Sunday";
                        break;
                }

                switch(sked.recurrenceType) {
                    case "A":
                        sked.recurrenceType = "Every";
                        break;
                    case "1":
                        sked.recurrenceType = "First";
                        break;
                    case "2":
                        sked.recurrenceType = "Second";
                        break;
                    case "3":
                        sked.recurrenceType = "Third";
                        break;
                    case "4":
                        sked.recurrenceType = "Fourth";
                        break;
                    case "L":
                        sked.recurrenceType = "Last";
                        break;

                }
            });
        }

        function transformAllResponseSchedules (data) {
            data = angular.fromJson(data);
            _.forEach(data, function(rsc){
                transformSchedulesFromServerToClient(rsc.time.schedules);
            });
            return data;
        }

        return timeFactory;
    }

    angular.module('times').factory('Times', TimeService);
})();

