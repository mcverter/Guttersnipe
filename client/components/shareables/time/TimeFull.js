import React, {PropTypes, Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import RRule from 'rrule';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


class TimeFull extends Component {
    constructor(props) {
        super(props);
        let {time, headline} = props;
        let events = time.calendar.events;
        let currentMonth = props.month || new Date();
        let event = events[0];
        let fixedDates = [];
        let recurringDateRules = [];
        if (event.recurrence_rule) {
            recurringDateRules.push({
                duration: (moment(event.dt_end) - moment(event.dt_start)),
                rule: this.makeRrule(event)});
        } else {
            fixedDates.push({start: event.start, end: event.end, title: headline});
        }
        this.state = {
            currentMonth,
            fixedDates, 
            recurringDateRules
        };
        this.onNavigate = this.onNavigate.bind(this);
    }

    makeRrule(event) {
        const daysToRRule = (days) => {
            return days.split(',').map(day => {
                switch (day) {
                    case 'su': return RRule.SU;
                    case 'mo': return RRule.MO;
                    case 'tu': return RRule.TU;
                    case 'we': return RRule.WE;
                    case 'th': return RRule.TH;
                    case 'fr': return RRule.FR;
                    case 'sa': return RRule.SA;
                }
            });
        };

        const freqToRRule = (freq) => {
            switch (freq) {
                case 'yearly': return RRule.YEARLY;
                case 'monthly': return RRule.MONTHLY;
                case 'weekly': return RRule.WEEKLY;
                case 'daily': return RRule.DAILY;
            }
        };

        return new RRule({
                freq: freqToRRule(event.recurrence_rule.freq),
                dtstart: new Date(event.dt_start),
                byweekday: daysToRRule(event.recurrence_rule.byDay)
        });
    }

    NavigateChanged(date) {

    }

    calculateRecurringEvents() {
        let {currentMonth, recurringDateRules} = this.state;
        const rule_wrapping = recurringDateRules[0];
        const rule = rule_wrapping.rule;
        let som = moment(currentMonth).startOf('month').subtract(7, 'days').toDate();
        let eom = moment(currentMonth).endOf('month').add(7, 'days').toDate();
        let rules = rule.between(som, eom);
        return rules.map(r => {
            let end_date = new Date(r.getTime() + rule_wrapping.duration);
            let schedule_object = {start: r, end: end_date, title: this.props.headline};
            return schedule_object;
        });
    }

    onNavigate(date) {
        this.setState({
            currentMonth: date
        });
    }


    render() {
        let recurringEvents = this.calculateRecurringEvents();
        let all_events = this.state.fixedDates.concat(recurringEvents);
        return (
            <div style={{height: "400px"}}> Hello world
                <BigCalendar className="calendar" timeslots={4}
                    events={all_events}
                    onNavigate={this.onNavigate}
                />
            </div>
        );
    }
}
TimeFull.propTypes = {
    headline: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    month: PropTypes.string
};

export default TimeFull;
