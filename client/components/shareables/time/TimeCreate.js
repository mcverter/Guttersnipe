import React, {PropTypes} from 'react';
import {FormSection, Field, reduxForm } from 'redux-form';

// Redux-Form
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import {renderTextField} from '../create-wizard/renderField';
import CalendarInputField from './CalendarInputField';

const TimeCreate = ({handleSubmit, previousPage, headline}) => (
    <form onSubmit={handleSubmit}>
        <FormSection name="time">
            <Field validate={required} name="calendar" component={CalendarInputField} props={{headline: headline}} />
            <Field name="notes" type="text" component={renderField} label="Additional Notes"/>
        </FormSection>
        <div>
            <button type="button" className="previous" onClick={previousPage}>Previous</button>
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