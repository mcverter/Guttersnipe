import React, {PropTypes} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import RRule from 'rrule';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const EventCalendarView = ({headline, viewMonth,
        fixedEvents, recurringEventGenerators,
        handleSelectSlot, handleNavigation,
        selectable, calendarView, handleCalendarViewChange}) => {
                const transformToRRule = (recurringGenerator) => {
                        const daysToRRule = (days) => {
                                return days.split(',').map(day => {
                    switch (day) {
                        case 'su':  return RRule.SU;
                        case 'mo':  return RRule.MO;
                        case 'tu':  return RRule.TU;
                        case 'we':  return RRule.WE;
                        case 'th':  return RRule.TH;
                        case 'fr':  return RRule.FR;
                        case 'sa':  return RRule.SA;
                    }
                });
            };

            const freqToRRule = (freq) => {
                switch (freq) {
                    case 'yearly':  return RRule.YEARLY;
                    case 'monthly':  return RRule.MONTHLY;
                    case 'weekly':  return RRule.WEEKLY;
                    case 'daily':  return RRule.DAILY;
                }
            };

            return new RRule({
                freq: freqToRRule(recurringGenerator.recurrence_rule.freq),
                dtstart: new Date(recurringGenerator.dt_start),
                byweekday: daysToRRule(recurringGenerator.recurrence_rule.byDay)
            });
        };

        const calculateRecurringEvents = () => {
                        return recurringEventGenerators.reduce((accumulator, eventGenerator) => {
                return accumulator.concat(transformToRRule(eventGenerator).between(
                    moment(viewMonth).startOf('month').subtract(7, 'days').toDate(),
                    moment(viewMonth).endOf('month').add(7, 'days').toDate()
                ).map(occurance => {
                                                return {
                            start: occurance, title: headline,
                            end: new Date(occurance.getTime() +
                                    new Date(eventGenerator.dt_end).getTime() -
                                    new Date(eventGenerator.dt_start).getTime())
                        };
                    }));
            }, []);
        };

        const calculatefixedEvents = (fixedEventGenerators) =>
        {
            return fixedEventGenerators.map(fixed => {
                    return {
                        start: new Date(fixed.dt_start),
                        end: new Date(fixed.dt_end),
                        title: fixed.headline
                    }
                }
            );
        };

        return (
            <div style={{height: "400px"}}>
                <BigCalendar className="calendar"
                    timeslots={4}
                    events={calculatefixedEvents(fixedEvents).concat(
                        calculateRecurringEvents(recurringEventGenerators))}
                    onNavigate ={handleNavigation}
                    onSelectSlot={handleSelectSlot}
                    selectable={selectable}
                    />
            </div>
        );
    }
    ;



EventCalendarView.propTypes = {
    headline: PropTypes.string.isRequired,
    fixedEvents: PropTypes.array.isRequired,
    recurringEventGenerators: PropTypes.array.isRequired,
    viewMonth: PropTypes.object,
    handleNavigation: PropTypes.func.isRequired,
    handleSelectSlot: PropTypes.func,
    handleCalendarViewChange: PropTypes.func,
    view: PropTypes.string,
    calendarView: PropTypes.string,
    handleCalendarViewChange: PropTypes.func,
    selectable: PropTypes.func
};

export default EventCalendarView;