import React, {PropTypes} from 'react';
import EventCalendarNavigable from './EventCalendarNavigable';

const TimeFull = (props) => {
    return (
  <div className="time-full">
    <h2> Calendar </h2>
    <EventCalendarNavigable
      arrayOfCalendarEventsWithHeadlines={[{
        headline: props.headline,
        calendarEvents: props.time.schedule.events
      }]}
      viewMonth={new Date()}/>
  </div>
  )
};

/*


        {
  "id": 1,
  "notes": "Lately (fall 2012), usually not until about midnight; sometimes earlier.",
  "schedule": {
    "events": [
      {
        "dt_end": "2016-12-12T02:00:00+00:00",
        "dt_start": "2016-12-12T00:00:00+00:00",
        "id": 1,
        "recurrence_rule": {
          "byDay": "su,mo,tu,we,th,fr,sa",
          "byMonth": null,
          "byMonthDay": null,
          "bySetPos": null,
          "byWeekNo": null,
          "byYearDay": null,
          "count": null,
          "freq": "weekly",
          "id": 1,
          "interval": 1,
          "until": null
        },
        "tz_id": "America/New_York"
      }
    ],
    "id": 1
  }
}

        headline={props.headline}
 calendarEvents={props.time.calendar.events}
 */

TimeFull.propTypes = {
  headline: PropTypes.string,
  time: PropTypes.object
//  , month: PropTypes.string
};

export default TimeFull;
