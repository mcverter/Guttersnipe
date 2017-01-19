import React, {Component, PropTypes} from 'react';

// Redux-Form
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';

// Calendar
// Add Date Modal
import AddDateModal from './AddDateModal';
import EventCalendarNavigable from './EventCalendarNavigable';
import EventCalendarInputField from './EventCalendarInputField'
import moment from 'moment';

class TimeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            modalStartTime: '',
            modalDuration: '',
            modalDate: '',
            modalDay: '',
            modalRepeating: false,

            fixedCalendarEvents: [],
            recurringCalendarEvents: []
        };

        // redux-form
        this.handleSubmit = props.handleSubmit;

        // calendar
        this.handleCalendarSelectSlot = this.handleCalendarSelectSlot.bind(this);

        // modal form
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleModalStartTimeChange = this.handleModalStartTimeChange.bind(this);
        this.handleModalDurationChange = this.handleModalDurationChange.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.handleModalRepeatToggle = this.handleModalRepeatToggle.bind(this);
    }

    handleCalendarSelectSlot(slotInfo) {
        if (slotInfo) {
            this.openModal(slotInfo);
            this.setState({
//                calendarView: 'day',
                startDate: slotInfo.start
            });
        }
    }

    openModal(timeSlot) {
        const startDate = moment(timeSlot.start);
        this.setState({
            modalIsOpen: true,
            modalStartTime: startDate.format('HH:mm') === '00:00'
                ? '18:00' : startDate.format('HH:mm'),
            modalDuration: 30,
            modalDate: startDate.format('MMMM DD, YYYY'),
            modalDay: startDate.format('dddd')
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    customModalStyles() {
        return {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                zIndex: 100

            },
            content: {
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                opacity: 0.9,

                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
    }

    handleModalSubmit(event) {
        if (this.state.modalRepeating) {
            this.setState({
                recurringCalendarEvents: this.state.recurringCalendarEvents.concat(
                    {
                        dt_start: moment(this.state.modalDate + " " +
                        this.state.modalStartTime, "MMMM DD, YYYY HH:mm")
                            .format(),
                        dt_end: moment(this.state.modalDate + " " +
                        this.state.modalStartTime, "MMMM DD, YYYY HH:mm")
                            .add(this.state.modalDuration, 'm').format(),
                        tz_id: 'America/New_York',
                        recurrence_rule: {
                            freq: 'weekly',
                            byDay: this.state.modalDay.substring(0, 2).toLowerCase()
                        }
                    }
                )
            });
        } else {
            this.setState({
                fixedCalendarEvents: this.state.fixedCalendarEvents.concat({
                    dt_start: moment(
                        this.state.modalDate + " " + this.state.modalStartTime, "MMMM DD, YYYY HH:mm")
                        .format(),
                    dt_end: moment(this.state.modalDate + " " +
                    this.state.modalStartTime, "MMMM DD, YYYY HH:mm")
                        .add(this.state.modalDuration, 'm').format(),
                    headline: this.props.headline
                })
            });
        }
        this.closeModal();
    }

    handleModalStartTimeChange(value) {
        this.setState({
            modalStartTime: value % 3600 ?
                `${(value - 1800) / 3600}:30` :
                `${(value) / 3600}`
        });
    }

    handleModalDurationChange(value) {
        this.setState({
            modalDuration: value.target.value
        });
    }

    handleModalRepeatToggle(value) {
        this.setState({
            modalRepeating: value.target.checked
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <EventCalendarNavigable
                    headline={this.props.headline}
                    fixedEvents={this.state.fixedCalendarEvents}
                    recurringEventGenerators={this.state.recurringCalendarEvents}
                    viewMonth={new Date()}
                    handleSelectSlot={this.handleCalendarSelectSlot}
                    selectable={true}
                />
                <Field name="time_notes" type="text" component={renderField} label="Additional Notes"/>
                <div>
                    <button type="submit" className="next">Next</button>
                </div>

                <AddDateModal
                    isOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    customStyles={this.customModalStyles()}
                    contentLabel="Example Modal"
                    start={this.state.modalStartTime}
                    date = {this.state.modalDate}
                    day = {this.state.modalDay}
                    duration = {this.state.modalDuration}
                    repeating = {this.state.modalRepeating}
                    handleRepeatToggle={this.handleModalRepeatToggle}
                    handleStartTimeChange={this.handleModalStartTimeChange}
                    handleDurationChange={this.handleModalDurationChange}
                    handleDateSelection = {this.handleModalSubmit}
                />
            </form>
        );
    }
}

TimeCreate.propTypes = {
    handleSubmit: PropTypes.func,
    headline: PropTypes.string
};

export default reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(TimeCreate);
