import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validateCreateShareableWizard'
import renderField from './renderField'

const ShareableCreateTime = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="dt_start" type="text" component={renderField} label="Start Time"/>
            <Field name="dt_end" type="text" component={renderField} label="End Time"/>
            <Field name="days_of_week" type="text" component={renderField} label="Days of the Week"/>
            <Field name="time_notes" type="text" component={renderField} label="Additional Notes"/>
            <div>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(ShareableCreateTime)