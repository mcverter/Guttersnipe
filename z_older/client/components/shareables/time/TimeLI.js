// Needs editing

import React, {PropTypes, Component} from 'react';

const TimeLI  = (props) =>  {
  const getDaysFromRule = (days) => {
    return days.split(',').map(day => {
      switch (day) {
        case 'su': return "Su, ";
        case 'mo': return "Mo, ";
        case 'tu': return "Tu, ";
        case 'we': return "We, ";
        case 'th': return "Th, ";
        case 'fr': return "Fr, ";
        case 'sa': return "Sa, ";
      }
    });

  }

  let {time} = props;
  if (! time || !time.schedule || !time.schedule.events ||
    time.schedule.events.length < 1) {
    return (
      <div>No Schedule Yet</div>
    )
  }


  let events = (time && time.schedule) ? time.schedule.events : [];
  let event = events[0];
  let fixedDates = [];
  let recurringDates = [];
  if (event.recurrence_rule) {
    recurringDates.push({
      days: getDaysFromRule(event.recurrence_rule.byDay),
      start: (new Date(event.dt_start)).toLocaleTimeString(),
      end: (new Date(event.dt_end)).toLocaleTimeString()
    });
  } else {
    fixedDates.push({start: event.start, end: event.end});
  }
  let key=1;

  return (
    <div className="time-li">
      {fixedDates && fixedDates.length >0 &&
      <ul>
        {fixedDates.map((date) => {
          return <li key={key++}> Start: {date.start} End: {date.end} </li>;
        })}
      </ul>
      }
      <br />
      {recurringDates && recurringDates.length >0 &&
      <ul>
        {recurringDates.map((date) => {
          return   (
            <li key={key++}> Start Time: {date.start} End Time: {date.end} <br />
              Every {date.days}</li>);
        })}
      </ul>
      }
    </div>
  );
}

TimeLI.propTypes = {
  time: PropTypes.object
};

export default TimeLI;