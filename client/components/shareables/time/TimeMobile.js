import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';
import Panel from 'react-bootstrap/lib/Panel';
import {shareableHasEvents} from './utils/timeVerifications'

const style = {
  width: '80%',
  'font-size': '150%',
  'backgroundColor': 'lightgray'
};


const TimeMobile = (props) => {
  debugger;
  const renderCalendar = () => {
    if (shareableHasEvents(props)) {
      return (
        <EventCalendarNavigable
          arrayOfCalendarEventsWithHeadlines={[{
            headline: props.headline,
            calendarEvents: props.time.schedule.events
          }]}
          viewMonth={new Date(props.time.timeNotes)}/>)
    } else if(props.time.timeNotes) {
      return (
        <div> {t} </div>
      )

    } else {
      return (
        <div>No Calendar Yet</div>
      );
    }
  };


  return (
    <Panel className="time-mobile">
      <h2> Calendar </h2>
      {renderCalendar()}
    </Panel>
  )
};

TimeMobile.propTypes = {
  headline: PropTypes.string,
  time: PropTypes.object
};

export default TimeMobile;
