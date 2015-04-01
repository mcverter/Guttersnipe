(function () {
    'use strict';
    function Schedule(punctualDate, recurringDOW,
                      recurrenceType, startTime, duration) {
        var self = this;
        if (punctualDate && (recurringDOW || recurrenceType)) {
            console.error('Error:  should not have both punctual and recurrence data')
        } else if (punctualDate) {
            self.punctualDate = punctualDate;
        } else if (recurringDOW && recurrenceType) {
            self.recurringDOW = recurringDOW;
        } else {
            console.error('Error:  Schedule must have either punctualDate or recurringDOW and recurrenceType')
        }

        if (!startTime || !duration) {
            console.error('Error:  Schedule must have time and duration')
        } else {
            self.startTime = startTime;
            self.duration = duration;
        }
    }
})()
