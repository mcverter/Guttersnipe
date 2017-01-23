import React, {PropTypes, Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../create-wizard/validateCreateShareableWizard';
import renderField from '../create-wizard/renderField';
import Select, {Creatable} from 'react-select'
import 'react-select/dist/react-select.css';
import _ from 'lodash';

const types_and_subtypes = [
    {
        value: "food",
        label: "food",
        subtypes: [
            {value: "dumpster", label: "dumpster"},
            {value: "food not bombs", label: "food not bombs"},
            {value: "face", label: "face"}]
    }, {
        value: "housing" ,
        label: "housing" ,
        subtypes: [
            {value: "squat", label: "squat"},
            {value: "punk house", label: "punk house"}

        ]
    }, {
        value: "medical",
        label: "medical",
        subtypes: [
            {value: "needle exchange", label: "needle exchange"},
            {value: "hiv", label: "hiv"}]
    }];

const tags = [
    {value: 'abc', label: 'abc'},
    {value: 'def', label: 'def'},
    {value: 'ghi', label: 'ghi'},
    {value: 'klm', label: 'klm'},
]

class ThingCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: tags,
            types: types_and_subtypes,
            subtypes: _.find(types_and_subtypes, {value: "food"}).subtypes

        }

        this.getSubtypes = this.getSubtypes.bind(this);
        this.handleTypesChange = this.handleTypesChange.bind(this);
    }
    handleTypesChange(value, formChangeFn) {
        formChangeFn(value);
        this.setState({
            subtypes: _.find(types_and_subtypes, {value: value}).subtypes
        })
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field name="description_what" type="text" component={renderField} label="What is the shareable resource"/>
                <Field name="description_how" type="text" component={renderField} label="How do you acquire it?"/>
                <Field name="types"
                    component={props =>
                        <Select
                            value={props.input.value}
                            onChange={(value)=> this.handleTypesChange
                            (value, props.input.onChange)}
                            onBlur={() => props.input.onBlur(props.input.value)}
                            options={this.state.types}
                            placeholder="Select"
                            simpleValue
                        />
                        }
                />


                <Field name="subtypes"
                    component={props =>
                        <Select
                            value={props.input.value}
                            onChange={props.input.onChange}
                            onBlur={() => props.input.onBlur(props.input.value)}
                            options={this.state.subtypes}
                            placeholder="Select"
                            multi={true}
                            simpleValue
                        />
                        }
                />

                <Field name="tags"
                    component={props =>
                        <Creatable
                            value={props.input.value}
                            onChange={props.input.onChange}
                            onBlur={() => props.input.onBlur(props.input.value)}
                            options={this.state.tags}
                            placeholder="Select"
                            simpleValue
                            multi={true}
                        />
                        }
                />

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


/*


 <Field name="tag_select" component={Select} props={{
 name:"tag-select",
 options : this.state.tags,
 multi: true,
 value:{input.value},
 onChange:{input.onChange},
 onBlur:{() => input.onBlur(input.value)}

 }}/>
 <Field name="subtype_select" component={Select} props={{
 name:"subtype-select",
 options : this.state.subtypes,
 multi: true,
 value:{input.value},
 onChange:{input.onChange},
 onBlur:{() => input.onBlur(input.value)}

 }}/>
 */