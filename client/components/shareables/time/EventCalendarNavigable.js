import React, {PropTypes, Component} from 'react';
import EventCalendarView from './EventCalendarView';
import {calculateShareableScheduleArray} from './utils/calendarTransformations';

class EventCalendarNavigable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMonth: props.viewMonth
    };
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(date) {
    this.setState({
      viewMonth: date
    });
  }

  render() {
    return (
      <EventCalendarView className="event-calendar-view"
        events={calculateShareableScheduleArray(
          this.props.arrayOfCalendarEventsWithHeadlines, this.state.viewMonth)}
        handleSelectSlot={this.props.handleSelectSlot}
        handleNavigation={this.handleNavigation}
        selectable={this.props.selectable} />
    );
  }
}

EventCalendarNavigable.propTypes = {
  viewMonth: PropTypes.object,
  handleSelectSlot: PropTypes.func,
  selectable: PropTypes.bool,
  arrayOfCalendarEventsWithHeadlines: PropTypes.array
};

export default EventCalendarNavigable;
