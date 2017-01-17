import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';

const ThingCreate = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="description_what" type="text" component={renderField} label="What is the shareable resource"/>
            <Field name="description_how" type="text" component={renderField} label="How do you acquire it?"/>
            <Field name="type" type="text" component={renderField} label="What is the type?"/>
            <Field name="subtypes" type="text" component={renderField} label="What are the subtypes?"/>
            <Field name="tags" type="text" component={renderField} label="What are the tags?"/>
            <Field name="thing_notes" type="text" component={renderField} label="Additional Notes"/>
            <div>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    );
};

ThingCreate.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(ThingCreate);