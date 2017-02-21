// Needs editing

import React, {PropTypes, Component} from 'react';

class TimeLI extends Component {
    constructor(props) {
        super(props);
        let {time} = props;
        let events = time.schedule.events;
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
                    case 'su': return "Su, ";
                    case 'mo': return "Mo, ";
                    case 'tu': return "Tu, ";
                    case 'we': return "We, ";
                    case 'th': return "Th, ";
                    case 'fr': return "Fr, ";
                    case 'sa': return "Sa, ";
                }
            });

    }


    render() {
        let {recurringDates, fixedDates} = this.state;
        let key=1;
        return (
            <div className="time-li">
            {fixedDates && fixedDates.length >0 &&
                <ul>
                    {fixedDates.map((date) => {
                    return <li key={key++}> Start: {date.start} End: {date.end} </li>;
                    })}
                </ul>
                }
                <br />
            {recurringDates && recurringDates.length >0 &&
                <ul>
                    {recurringDates.map((date) => {
                    return   (
                      <li key={key++}> Start Time: {date.start} End Time: {date.end} <br />
                        Every {date.days}</li>);
                    })}
                 </ul>
                }

        </div>
        );
    }
}
TimeLI.propTypes = {
    time: PropTypes.object
};

export default TimeLI;
