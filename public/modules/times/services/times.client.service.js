(function () {
  'use strict';

  function TimeService() {
    var timeFactory = {
      emptyTime: getEmptyTime,
      createCalendarFromResources : createCalendarFromResources,
      transformBeforeCreate: transformSchedulesBeforeCreateResource
    };

    function createCalendarFromResources(resources) {
      var dailies = [ [], [], [],  [],  [],  [],   [] ]
      var nonRepeating = [];

      _.forEach(resources, function(rsc){
        var headline = rsc.thing.description.headline;
        var id = rsc._id;
        _.forEach(rsc.time.schedules, function(sked){
          if (sked.recurrenceType) {
            var startDT = new Date(sked.start);
            var endDT = new Date(sked.end);
            var day = startDT.getDay();
            var start = startDT.getTime();
            var duration = endDT.getTime() - startDT.getTime();
            dailies[day].push({headline: headline, id: id, start: start, duration: duration});
          }
          else {
            nonRepeating.push({
              _id: id,
              start:  new Date(sked.start),
              end: new Date(sked.end),
              title: headline,
              url: '#/resources/' + id

            });
          }
        })
      });
      return {repeating: dailies, nonRepeating: nonRepeating};
    }

    function getEmptyTime() {
      return {
        schedules: [],
        notes: ''
      }
    }

    function transformSchedulesBeforeCreateResource(time) {
      var scheds = []
      _.forEach(time.schedules, function(schedule) {
        scheds.push({
          start: schedule.start,
          end: schedule.end,
          recurrenceType: schedule.recurrenceType
        })

      });
      time.schedules = scheds;
    }

    return timeFactory;
  }

  angular.module('times').factory('Times', TimeService);
})();

