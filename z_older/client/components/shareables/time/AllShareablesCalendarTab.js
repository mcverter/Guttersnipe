import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import EventCalendarNavigable from './EventCalendarNavigable';

export const AllShareablesCalendarTabComponent = (props) => {
  const {shareables: {isFetchingShareables, items}}= props;

  if (isFetchingShareables || !items || items.length < 1) {
    return <div>Loading...</div>;
  }

  const itemHasEvents = (item) => {
    return item && item.time && item.time.schedule
      && item.time.schedule.events
  };

  const allEvents = items.map((item)=>
    ({calendarEvents: itemHasEvents(item) ?
      item.time.schedule.events : [],
      headline: item.headline}));

  return (
    <div className="all-shareables-calendar-tab">
    <EventCalendarNavigable
      arrayOfCalendarEventsWithHeadlines={allEvents}
      viewMonth={new Date()} />
    </div>
  );
};

AllShareablesCalendarTabComponent.propTypes = {
  shareables: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps)(AllShareablesCalendarTabComponent);

