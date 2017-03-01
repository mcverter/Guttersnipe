import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';
import Panel from 'react-bootstrap/lib/Panel';

const TimeFull = (props) => {
  return (
    <Panel className="time-full">
      <h2> Calendar </h2>
      <EventCalendarNavigable
        arrayOfCalendarEventsWithHeadlines={[{
          headline: props.headline,
          calendarEvents: props.time.schedule.events
        }]}
        viewMonth={new Date()}/>
    </Panel>
  )
};

TimeFull.propTypes = {
  headline: PropTypes.string,
  time: PropTypes.object
};

export default TimeFull;
