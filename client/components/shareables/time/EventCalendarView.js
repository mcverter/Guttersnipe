import React, {PropTypes, Component} from 'react';

import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import {calculateAllEvents} from './utils/calendarTransformations'
BigCalendar.momentLocalizer(moment);

const EventCalendarView = ({headline, viewMonth,
  handleSelectSlot, handleNavigation,
  selectable, calendarEvents}) => {



  return (
    <div style={{height: "400px"}}>
      <BigCalendar
        className="calendar"
        timeslots={4}
        events={calculateAllEvents(calendarEvents, viewMonth, headline)}
        onNavigate ={handleNavigation}
        onSelectSlot={handleSelectSlot}
        selectable={selectable} />
    </div>
  );
};

EventCalendarView.propTypes = {
  headline: PropTypes.string.isRequired,
  calendarEvents: PropTypes.array.isRequired,
  viewMonth: PropTypes.object,
  handleNavigation: PropTypes.func.isRequired,
  handleSelectSlot: PropTypes.func,
  selectable: PropTypes.bool
};

export default EventCalendarView;
