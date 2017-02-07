import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';

const TimeFull = (props) => (
  <div>
    <h2> Calendar </h2>
    <EventCalendarNavigable
      arrayOfCalendarEventsWithHeadlines={[{
        headline:props.headline,
        calendarEvents: props.time.calendar.events
      }]}
      viewMonth={new Date()} />
  </div>
);

/*        headline={props.headline}
 calendarEvents={props.time.calendar.events}
 */

TimeFull.propTypes = {
  headline: PropTypes.string.isRequired,
  time: PropTypes.object.isRequired
//  , month: PropTypes.string
};

export default TimeFull;
