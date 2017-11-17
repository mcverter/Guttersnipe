import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';
import Panel from 'react-bootstrap/lib/Panel';
import {shareableHasEvents} from './utils/timeVerifications'

const TimeFull = (props) => {
  const renderCalendar = () => {
    if (shareableHasEvents(props)) {
      return (
        <EventCalendarNavigable
          arrayOfCalendarEventsWithHeadlines={[{
            headline: props.headline,
            calendarEvents: props.time.schedule.events
          }]}
          viewMonth={new Date()}/>)
    } else {
      return (
        <div>No Calendar Yet</div>
      );
    }
  };


  return (
    <Panel className="time-full">
      <h2> Calendar </h2>
      {renderCalendar()}
    </Panel>
  )
};

TimeFull.propTypes = {
  headline: PropTypes.string,
  time: PropTypes.object
};

export default TimeFull;
