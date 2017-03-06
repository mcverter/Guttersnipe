import React, {PropTypes, Component} from 'react';

import moment from 'moment';
import BigCalendar from 'react-big-calendar';
BigCalendar.momentLocalizer(moment);

const EventCalendarView = ({handleSelectSlot, handleNavigation,
  selectable, events}) => {


  return (
    <div id="event-calendar-view">
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
  events: PropTypes.array,
  handleNavigation: PropTypes.func,
  handleSelectSlot: PropTypes.func,
  selectable: PropTypes.bool
};

export default EventCalendarView;
