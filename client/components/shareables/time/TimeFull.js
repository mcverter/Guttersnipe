import React, {PropTypes, Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import RRule from 'rrule';
import EventCalendarNavigable from './EventCalendarNavigable'

BigCalendar.momentLocalizer(moment); // oFr globalizeLocalizer

const TimeFull = (props) => (
    <EventCalendarNavigable
        headline={props.headline}
        fixedEvents={props.time.calendar.events.filter(e => !e.recurrence_rule)}
        recurringEventGenerators={props.time.calendar.events.filter(e => e.recurrence_rule)}
        viewMonth={new Date()}
    />
);


TimeFull.propTypes = {
    headline: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    month: PropTypes.string
};

export default TimeFull;
