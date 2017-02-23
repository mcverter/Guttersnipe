import React, {PropTypes} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import {connect} from 'react-redux';
import {fetchAllShareables} from '../../actions/shareables/shareableActions';
import {Link} from 'react-router';
import EventCalendarNavigable from '../shareables/time/EventCalendarNavigable';

export const AllShareablesCalendarPage = (props) => {
  const {shareables: {isFetchingShareables, items}}= props;

  if (isFetchingShareables || !items || items.length < 1) {
    return <div>Loading...</div>;
  }

  const allEvents = items.map((item)=>
    ({calendarEvents: item.time.schedule.events, headline: item.headline}));

  return (
    <div className="all-shareables-calendar-tab">
    <EventCalendarNavigable
      arrayOfCalendarEventsWithHeadlines={allEvents}
      viewMonth={new Date()} />
    </div>
  );
};

AllShareablesCalendarPage.propTypes = {
  shareables: PropTypes.object,
  fetchAllShareables: PropTypes.func
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps, {fetchAllShareables})(AllShareablesCalendarPage);

