import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../create-wizard/validateCreateShareableWizard'
import renderField from '../create-wizard/renderField'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Component} from 'react';
import AddDateModal from './AddDateModal'

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class TimeCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = props.handleSubmit
        this.eventList = [];
        this.addDate = this.addDate.bind(this);
        this.state = {modalIsOpen: false};
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(timeSlot) {
        this.setState({
            modalIsOpen: true,
            timeSlot: timeSlot});
    }

    afterOpenModal() {
        console.log("after modal open")
    }

    closeModal() {
         this.setState({modalIsOpen: false});
    }
    /*
     function(
     slotInfo: object {
     start: Date,
     end: Date,
     slots: array<Date>
     }
     )
     */

    addDate(slotInfo) {
        console.log("clicked a slot", slotInfo);
        this.openModal(slotInfo);
    }

    render() {
        console.log('gonna render');

        return (


            <form onSubmit={this.handleSubmit}>
                <div style={{height: "400px"}}>
                    <BigCalendar events={this.eventList}
                        selectable
                        onSelectSlot={this.addDate}
                    />
                </div>
                <Field name="dt_start" type="text" component={renderField} label="Start Time"/>
                <Field name="dt_end" type="text" component={renderField} label="End Time"/>
                <Field name="days_of_week" type="text" component={renderField} label="Days of the Week"/>
                <Field name="time_notes" type="text" component={renderField} label="Additional Notes"/>
                <div>
                    <button type="submit" className="next">Next</button>
                </div>
                after open modal {this.afterOpenModal}
                <AddDateModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    closeModal={this.closeModal}
                    customStyles={customStyles}
                    contentLabel="Example Modal"
                    timeSlot={this.state.timeSlot}
                />


            </form>
        )
    }
}
export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(TimeCreate)

/**
 */