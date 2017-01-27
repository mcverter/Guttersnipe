// Needs editing

import React, {PropTypes, Component} from 'react';

class TimeLI extends Component {
    constructor(props) {
        super(props);
        let {time} = props;
        let events = time.calendar.events;
        let event = events[0];
        let fixedDates = [];
        let recurringDates = [];
        if (event.recurrence_rule) {
            recurringDates.push({
                days: this.getDaysFromRule(event.recurrence_rule.byDay),
                start: (new Date(event.dt_start)).toLocaleTimeString(),
                end: (new Date(event.dt_end)).toLocaleTimeString()
            });
        } else {
            fixedDates.push({start: event.start, end: event.end});
        }
        this.state = {
            fixedDates,
            recurringDates
        };
    }

    getDaysFromRule(days) {
            return days.split(',').map(day => {
                switch (day) {
                    case 'su': return "Sunday";
                    case 'mo': return "Monday";
                    case 'tu': return "Tuesday";
                    case 'we': return "Wednesday";
                    case 'th': return "Thursday";
                    case 'fr': return "Friday";
                    case 'sa': return "Saturday";
                }
            });
    }


    render() {
        let {recurringDates, fixedDates} = this.state;
        return (
            <div>
            {fixedDates && fixedDates.length >0 &&
                <ul>
                    {fixedDates.map((date) => {
                    return <li key={date.start}> Start: {date.start} End: {date.end} </li>;
                    })}
                </ul>
                }
                <br />
            {recurringDates && recurringDates.length >0 &&
                <ul>
                    {recurringDates.map((date) => {
                    return   (                  <li key={date.start}> Start Time: {date.start} End Time: {date.end} <br />
                        Every {date.days}</li>);
                    })}
                 </ul>
                }

        </div>
        );
    }
}
TimeLI.propTypes = {
    time: PropTypes.object.isRequired
};

export default TimeLI;
