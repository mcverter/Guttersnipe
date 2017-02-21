import React from 'react';
import moment from 'moment';
/*
{
  "dt_start": "2017-01-31T18:00:00",
  "tz_id": "America/New_York",
  "dt_end": "2017-01-31T18:30:00",
  "headline": "aa"
}

{
  "dt_start": "2017-02-01T15:30:00",
  "dt_end": "2017-02-01T17:30:00",
  "tz_id": "America/New_York",
  "recurrence_rule": {
    "freq": "weekly",
    "byDay": "we"
  }
}

 */
const DateListing = (props) => {
  const events = props.events;

  const renderEvent = (event) => {
    console.log(event);
    const start_mom = moment(event.dt_start)
    const end_mom = moment(event.dt_end)

    let day, start, end
    if (event.recurrence_rule){
      day = "Every " + start_mom.format('dddd')
    } else {
      day = start_mom.format('MMMM Do YYYY')
    }

    start = start_mom.format('hh:mm A')
    end = end_mom.format('hh:mm A')
    return (
      <tr><td>{day}</td><td>{start}</td><td>{end}</td></tr>

    )
  }

  return (
    <table className="date-listing">
      <thead>
      <th>Date</th>
      <th>Start</th>
      <th>End</th>
      </thead>
      {events.map(e=>renderEvent(e))}
    </table>
  )
}

export default DateListing;
