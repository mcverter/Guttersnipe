import React, {Component, PropTypes} from 'react';

// General Redux-Form
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';

// Calendar
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Add Date Modal
import AddDateModal from './AddDateModal';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class TimeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            calendarView: 'month',
            startDate: '',
            eventList: [],
            modalStartTime: '',
            modalDuration: '',
            modalDate: '',
            modalDay: '',
            repeating: ''
        };
        this.handleSubmit = props.handleSubmit;
        this.addDate = this.addDate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleTimeChooserSubmit = this.handleTimeChooserSubmit.bind(this);
        this.handleRepeatToggle = this.handleRepeatToggle.bind(this);
    }

    customStyles() {
        return {
        overlay : {
            position          : 'fixed',
                top               : 0,
                left              : 0,
                right             : 0,
                bottom            : 0,
                backgroundColor   : 'rgba(255, 255, 255, 0.75)'
        },
        content : {
            top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
        }};
    }

    handleTimeChooserSubmit(event) {
        console.log('event', event);
        console.log('submitted time');
        debugger;
    }

    handleStartTimeChange(value) {
        this.setState({
            modalStartTime: value % 3600 ?
                `${(value-1800)/3600}:30` :
                `${(value)/3600}`
        });
    }

    handleDurationChange(value) {
        this.setState({
            modalDuration: value.target.value
        });
    }

    handleRepeatToggle(value) {
        this.setState({
            repeating: value.target.checked
        });
    }

    openModal (timeSlot) {
        const startDate = moment(timeSlot.start);
        this.setState({
            modalIsOpen: true,
            modalStartTime: startDate.format('HH:mm') === '00:00'
                ?  '18:00': startDate.format('HH:mm'),
            modalDuration: '',
            modalDate: startDate.format('MMMM dddd, YYYY'),
            modalDay: startDate.format('dddd')
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    addDate(slotInfo) {
        this.setState({
            calendarView: 'day',
            startDate: slotInfo.start
        });
        this.openModal(slotInfo);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div style={{height: "400px"}}>
                    <BigCalendar events={this.state.eventList}
                        selectable
                        onSelectSlot={this.addDate}
                        view={this.state.calendarView}
                        onView={this.onView}
                    />
                </div>

                <Field name="time_notes" type="text" component={renderField} label="Additional Notes"/>
                <div>
                    <button type="submit" className="next">Next</button>
                </div>

                <AddDateModal
                    isOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    customStyles={this.customStyles}
                    contentLabel="Example Modal"
                    start={this.state.modalStartTime}
                    date = {this.state.modalDate}
                    day = {this.state.modalDay}
                    duration = {this.state.modalDuration}
                    repeating = {this.state.repeating}
                    handleRepeatToggle={this.handleRepeatToggle}
                    handleStartTimeChange={this.handleStartTimeChange}
                    handleDurationChange={this.handleDurationChange}
                    handleDateSelection = {this.handleTimeChooserSubmit}
                />
            </form>
        );
    }
}

TimeCreate.propTypes = {
    handleSubmit: PropTypes.func
};


export default reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(TimeCreate);
