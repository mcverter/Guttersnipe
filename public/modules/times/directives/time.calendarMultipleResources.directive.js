(function () {
  'use strict';

  function CalendarExampleController($scope,$compile) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var MS_PER_DAY = 86400000;

    console.log('calendar example is ', $scope.calendar);
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    ];

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        }
      }
    };

    function eventFunction(start, end, timezone, callback) {
      console.log('event function.  start: ', start, ' end ', end);

      var e = {},
        events = [];

      for(var date = start; date <= end; date.setTime( date.getTime() + MS_PER_DAY )){
        _.forEach($scope.calendar.repeating[date.getDay()], function(event){
          console.log('the event is', event, 'the day is', date);
          var eventStart = new Date(event.start);
          e.start = date.getTime() + eventStart.getTime() - eventStart.getDay().getTime();
          e.end = e.start + event.duration;
          e.title = '<a href="' + event.id + '">' + event.headline + "</a>";
          events.push(e)
        })
      }
      callback(events);
    }
    /* event sources array*/
    $scope.eventSources = [$scope.events, eventFunction];
    console.log('event sources', $scope.eventSources);
  }


  angular.module('times')
    .directive('resourcesCalendar', ['times_templates', function(templates) {
      var templateUrl = templates.main + 'resources-calendar.client.template.html';

      return {
          scope : {
            calendar: '='
          },
        restrict: 'E',
        templateUrl: templateUrl,
        controller:  CalendarExampleController
      };
    }]
  )  ;
})();

