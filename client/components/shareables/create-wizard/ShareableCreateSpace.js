
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validateCreateShareableWizard'
import renderField from './renderField'

const ShareableCreateSpace = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="longitude" type="text" component={renderField} label="Longitude"/>
            <Field name="latitude" type="text" component={renderField} label="Latitude"/>
            <Field name="canonical_address" type="text" component={renderField} label="Canonical Address"/>
            <Field name="alternate_names" type="text" component={renderField} label="Alternate names"/>
            <Field name="space_notes" type="text" component={renderField} label="Additional Notes"/>
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
})(ShareableCreateSpace)