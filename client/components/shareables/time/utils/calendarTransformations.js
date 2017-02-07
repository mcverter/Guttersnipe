import moment from 'moment';
import RRule from 'rrule';


const transformToRRule = (recurringGenerator) => {
  const daysToRRule = (days) => {
    return days.split(',').map(day => {
      switch (day) {
        case 'su':  return RRule.SU;
        case 'mo':  return RRule.MO;
        case 'tu':  return RRule.TU;
        case 'we':  return RRule.WE;
        case 'th':  return RRule.TH;
        case 'fr':  return RRule.FR;
        case 'sa':  return RRule.SA;
      }
    });
  };

  const freqToRRule = (freq) => {
    switch (freq) {
      case 'yearly':  return RRule.YEARLY;
      case 'monthly':  return RRule.MONTHLY;
      case 'weekly':  return RRule.WEEKLY;
      case 'daily':  return RRule.DAILY;
    }
  };

  return new RRule({
    freq: freqToRRule(recurringGenerator.recurrence_rule.freq),
    dtstart: new Date(recurringGenerator.dt_start),
    byweekday: daysToRRule(recurringGenerator.recurrence_rule.byDay)
  });
};

export const calculateAllEvents = (calendarEvents, viewMonth, headline) => {
  const ev = calendarEvents.reduce((accumulator, event) => {
    if (event.recurrence_rule) {
      return accumulator.concat(transformToRRule(event).between(
        moment(viewMonth).startOf('month').subtract(7, 'days').toDate(),
        moment(viewMonth).endOf('month').add(7, 'days').toDate()
      ).map(occurance => {
        return {
          title: headline,
          start: occurance,
          end: new Date(occurance.getTime() +
            new Date(event.dt_end).getTime() -
            new Date(event.dt_start).getTime())
        };
      }));
    } else {
      return accumulator.concat({
        start: new Date(event.dt_start),
        end: new Date(event.dt_end),
        title: headline
      });
    }
  }, []);
  return ev;
};



export const calculateAllEventsWithHeadlines = (calendarEventsWithHeadlines, viewMonth) => {
  debugger;
  return calculateAllEvents(calendarEventsWithHeadlines.calendarEvents, viewMonth, calendarEventsWithHeadlines.headline);
};

export const calculateShareableScheduleArray = (shareableScheduleArray, viewMonth) => {
  debugger;
  const foo= shareableScheduleArray.reduce(
    (accumulator, schedule) =>  accumulator.concat(calculateAllEvents(schedule, viewMonth)), []
  )
  console.log(foo)
  return foo;
};
