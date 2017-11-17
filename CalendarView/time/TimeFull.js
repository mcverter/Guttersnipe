import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';
import Panel from 'react-bootstrap/lib/Panel';

function TimeFull (props) {
  if (props.time  && props.time.schedule
    && props.time.schedule.events) {
    return (
      <Panel className="time-full">
        <h2> Calendar </h2>

        <EventCalendarNavigable
          arrayOfCalendarEventsWithHeadlines={[{
            headline: props.headline,
            calendarEvents: props.time.schedule.events
          }]}
          viewMonth={new Date()}
        />
      </Panel>
    )
  } else {
    return (
      <Panel className="time-full">
        <div>No Calendar Yet</div>
      </Panel>
    );
  }
}

TimeFull.propTypes = {
  headline: PropTypes.string.isRequired,
  time: PropTypes.object
};

export default TimeFull;
