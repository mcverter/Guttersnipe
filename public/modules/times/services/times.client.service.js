
(function (angular, _) {
  'use strict';

  angular.module('times').factory('Times',
    function() {
      var timeFactory,
        weekdayEnum = 	   ['all', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        recurrenceTypeEnum = ['A', '1', '2', '3', '4', 'L'];

      var emptyTime = {
          schedules: [],
          notes: ''
      };

      function Time(schedules, notes) {
        var self = this;
        if (!schedules || !schedules.length || schedules.length < 1) {
          console.err('Error: Schedules is empty');
        }
        self.schedules = schedules;
        self.notes = notes;
      }

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

      function Report(data) {
        var self = this;
        self.data = data || {};
        self.state = {};
      }

      timeFactory = Object.create(Object.prototype, {
        emptyTime: {
          enumerable: true,
          get: function getEmptyTime() {
            return _.cloneDeep(emptyTime);
          }
        }
      });

      return timeFactory;
    }
  );
})(window.angular, window._);

