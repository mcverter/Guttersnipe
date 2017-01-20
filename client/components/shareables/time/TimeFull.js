import React, {PropTypes, Component} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';

const TimeFull = (props) => (
    <EventCalendarNavigable
        headline={props.headline}
        calendarEvents={props.time.calendar.events}
        viewMonth={new Date()}
    />
);

TimeFull.propTypes = {
    headline: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    month: PropTypes.string
};

export default TimeFull;
