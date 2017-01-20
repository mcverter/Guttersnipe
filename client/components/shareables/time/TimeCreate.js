import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';

// Redux-Form
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';
import CalendarInputField from './CalendarInputField';

const TimeCreate = ({handleSubmit, headline}) => (
    <form onSubmit={handleSubmit}>
        <Field name="event_chooser" component={CalendarInputField} props={{headline: headline}} />} />
        <Field name="time_notes" type="text" component={renderField} label="Additional Notes"/>
        <div>
            <button type="submit" className="next">Next</button>
        </div>
    </form>
);

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
