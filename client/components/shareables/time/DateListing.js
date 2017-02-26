import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/lib/Table';

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
      <tr>
        <td cellPadding="15px">{day}</td>
        <td cellPadding="15px">{start}</td>
        <td cellPadding="15px">{end}</td></tr>

    )
  }

if (!events || events.length < 1) {
  return (<div /> );
}
  return (

    <Table bordered striped className="date-listing">
      <thead>
      <th cellPadding="15px">Date</th>
      <th cellPadding="15px">Start</th>
      <th cellPadding="15px">End</th>
      </thead>
      {events.map(e=>renderEvent(e))}
    </Table>
  )
}

export default DateListing;
