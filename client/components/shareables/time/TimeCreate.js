import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../create-wizard/validateCreateShareableWizard'
import renderField from '../create-wizard/renderField'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Component} from 'react';
import AddDateModal from './AddDateModal';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


class ShareableCreateTime extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = props.handleSubmit
        this.eventList = [];
        this.addDate = this.addDate.bind(this);
    }

    getInitialState() {
        return {modalIsOpen: false};
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.refs.subtitle.style.color = '#f00';
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
        this.openModal();
    }

    render() {
        debugger;
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

                <AddDateModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" />
            </form>
        )
    }
}
export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(ShareableCreateTime)