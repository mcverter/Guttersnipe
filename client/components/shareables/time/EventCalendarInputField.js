import React, {Component, PropTypes} from 'react';

// Redux-Form
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';

// Calendar
// Add Date Modal
import AddDateModal from './AddDateModal';
import EventCalendarNavigable from './EventCalendarNavigable';

import moment from 'moment';

class EventCalendarInputField extends Component{
    constructor(props) {
        super(props);
    }


    render () {
    const { input: { value, onChange } } = this.props

    return (

                <EventCalendarNavigable
                    headline={props.headline}
                    fixedEvents={props.fixedCalendarEvents}
                    recurringEventGenerators={props.recurringCalendarEvents}
                    viewMonth={props.viewMonth}
                    handleSelectSlot={props.handleSelectSlot}
                    selectable={props.selectable}
                />
    )
}
}
export default EventCalendarInputField;