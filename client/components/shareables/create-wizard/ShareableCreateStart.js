import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import validate, {required} from './validateCreateShareableWizard';
import renderField, {RenderBSTextField} from './renderField';
import Button from 'react-bootstrap/lib/Button';


const ShareableCreateStart = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="headline" type="text" component={RenderBSTextField} validate={required} label="Headline"/>
            <Field name="summary" type="textarea" component={RenderBSTextField}  validate={required} label="Summary"/>
            <div>
                <Button type="submit" className="next">Next</Button>
            </div>
        </form>
    );
};

ShareableCreateStart.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(ShareableCreateStart);
