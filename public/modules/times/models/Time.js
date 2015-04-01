(function () {
    'use strict';
    function Time(schedules, notes) {
        var self = this;
        if (!schedules || !schedules.length || schedules.length < 1) {
            console.error('Error: Schedules is empty');
        }
        self.schedules = schedules;
        self.notes = notes;
    }
})()
