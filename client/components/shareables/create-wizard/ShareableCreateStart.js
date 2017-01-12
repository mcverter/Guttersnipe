
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validateCreateShareableWizard'
import renderField from './renderField'

const ShareableCreateStart = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="headline" type="text" component={renderField} label="Headline"/>
            <Field name="Summary" type="text" component={renderField} label="Summary"/>
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
})(ShareableCreateStart)