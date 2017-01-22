import React, {PropTypes, Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';
import Select from 'react-select'
import 'react-select/dist/react-select.css';

const types_and_subtypes = {
    "food" : [
        "dumpster", "food not bombs", "face"
    ],
    "housing" : [
        "squat", "punk house"
    ],
    "health" : [
        'needle exchage', 'his clinic'
    ]
}

const tags = ["blud", 'guts', 'onor','gawa']

class ThingCreate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    let TypeSelect = <Select
        name="type-select"
        onChange={typeSelectChange}
        options ={types_and_subtypes.keys()}
    />;
    let SubTypeSelect = <Select
        name="subtype-select"
        onChange={subtypeSelectChange}
        options ={types_and_subtypes[this.state.selectedType]}
    />;
    let TagSelect = <Select
        name="tags-select"
        onChange={subtypeSelectChange}
        options ={types_and_subtypes[this.state.selectedType]}
    />;

        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field name="description_what" type="text" component={renderField} label="What is the shareable resource"/>
                <Field name="description_how" type="text" component={renderField} label="How do you acquire it?"/>
                <Field component={TypeSelect} />
                <Field component={SubTypeSelect} />
                <Field component={TagSelect} />
                <Field name="thing_notes" type="text" component={renderField} label="Additional Notes"/>
                <div>
                    <button type="submit" className="next">Next</button>
                </div>
            </form>
        );
    }
}

ThingCreate.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(ThingCreate);