import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';

const TimeFull = (props) => (
    <EventCalendarNavigable
      calendarEventsWithHeadlines={{
        headline:props.headline,
        calendarEvents: props.time.calendar.events
      }}
        viewMonth={new Date()} />
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
