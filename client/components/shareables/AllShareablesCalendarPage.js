import React, {PropTypes} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import {connect} from 'react-redux';
import {fetchAllShareables} from '../../actions/shareables/shareableActions';
import {Link} from 'react-router';
import EventCalendarNavigable from './time/EventCalendarNavigable'

class AllShareablesCalendarPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllShareables();
  }

  render() {
    const {
      shareables: {
        isFetchingShareables,
        shareableFetchError, items, selectedIndex
      }
    }  = this.props;

    if (isFetchingShareables || !items || items.length < 1) {
      return <div>Loading...</div>;
    }
    debugger;

    const allEvents = items.map((item)=>
      ({calendarEvents: item.time.calendar.events, headline: item.headline}));

    return (
    <EventCalendarNavigable
      arrayOfCalendarEventsWithHeadlines={allEvents}
        viewMonth={new Date()} />
    )
  }
}

AllShareablesCalendarPage.propTypes = {
  shareables: PropTypes.object.isRequired,
  fetchAllShareables: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps, {fetchAllShareables})(AllShareablesCalendarPage);

