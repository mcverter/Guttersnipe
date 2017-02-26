import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/lib/Table';

const DateListing = (props) => {
  const {events, deleteEvent} = props;

  const renderEvent = (event) => {
    console.log(event);
    const start_mom = moment(event.dt_start)
    const end_mom = moment(event.dt_end)
    const eventIndex = event.eventIndex;

    let day, start, end
    if (event.recurrence_rule){
      day = "Every " + start_mom.format('dddd')
    } else {
      day = start_mom.format('MMMM Do YYYY')
    }

    start = start_mom.format('hh:mm A')
    end = end_mom.format('hh:mm A')
    return (
      <tr key={eventIndex}>
        <td cellPadding="10px">{day}</td>
        <td cellPadding="10px">{start}</td>
        <td cellPadding="10px">{end}</td>
        <td cellPadding="10px" 
          onClick={()=>deleteEvent(eventIndex)}> X</td>
        </tr>
    )
  }

if (!events || events.length < 1) {
  return (<div /> );
}
  return (

    <Table bordered striped className="date-listing">
      <thead>
      <th cellPadding="10px">Date</th>
      <th cellPadding="10px">Start</th>
      <th cellPadding="10px">End</th>
      <th cellPadding="10px">Cancel</th>
      </thead>
      {events.map(e=>renderEvent(e))}
    </Table>
  )
}

export default DateListing;
