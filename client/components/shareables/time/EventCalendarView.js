import React, {PropTypes, Component} from 'react';

import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import {calculateAllEvents} from './utils/calendarTransformations'
BigCalendar.momentLocalizer(moment);

const EventCalendarView = ({headline, viewMonth,
  handleSelectSlot, handleNavigation,
  selectable, events}) => {


  return (
    <div style={{height: "400px"}}>
      <BigCalendar
        className="calendar"
        timeslots={4}
        events={events}
        onNavigate ={handleNavigation}
        onSelectSlot={handleSelectSlot}
        selectable={selectable} />
    </div>
  );
};

EventCalendarView.propTypes = {
  events: PropTypes.array.isRequired,
  handleNavigation: PropTypes.func.isRequired,
  handleSelectSlot: PropTypes.func,
  selectable: PropTypes.bool
};

export default EventCalendarView;
