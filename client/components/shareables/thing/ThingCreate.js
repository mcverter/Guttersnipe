import React, {PropTypes, Component} from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';
import {RenderCreatableField, RenderBSTextField, RenderSelectField} from '../create-wizard/renderField';
import 'react-select/dist/react-select.css';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';


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

        this.handleTypesChange = this.handleTypesChange.bind(this);
    }
    handleTypesChange(value, formChangeFn) {
        formChangeFn(value);
        this.setState({
            subtypes: _.find(types_and_subtypes, {value: value}).subtypes
        })
    }
/*
                        component={props =>
                            <Select
                                value={props.input.value}
                                onChange={(value)=> this.handleTypesChange
                                (value, props.input.onChange)}
                                onBlur={() => props.input.onBlur(props.input.value)}
                                options={this.state.types}
                                placeholder="Select a Type"
                                simpleValue
                                label="Types"
                            />
*/
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormSection name="thing">
                    <FormGroup>
                    <Field validate={required} name="description_what" type="text" component={renderBSTextField} label="What is the shareable resource"/>
                   </FormGroup>
                   <FormGroup>
                    <Field validate={required} name="description_how" type="text" component={renderBSTextField} label="How do you acquire it?"/>
                    </FormGroup>
                    <FormGroup>
                    <Field name="type"
                        validate={required}
                        component={props =>
                            <RenderSelectField
                                value={props.input.value}
                                onChange={(value)=> this.handleTypesChange
                                (value, props.input.onChange)}
                                onBlur={() => props.input.onBlur(props.input.value)}
                                options={this.state.types}
                                placeholder="Select a Type"
                                simpleValue
                                label="Types"
                            />
                            }
                    />
                    </FormGroup>

                    <FormGroup>
                    <label>Select Zero or More Subtypes</label>
                    <Field name="subtypes"
                        component={props =>
                            <RenderSelectField
                                value={props.input.value}
                                onChange={props.input.onChange}
                                onBlur={() => props.input.onBlur(props.input.value)}
                                options={this.state.subtypes}
                                placeholder="Select Zero or More Subtypes"
                                multi={true}
                                simpleValue
                            />
                            }
                    />
                    </FormGroup>

<FormGroup>
                    <Field name="tags"
                        component={props =>
                            <RenderCreatableField
                                value={props.input.value}
                                onChange={props.input.onChange}
                                onBlur={() => props.input.onBlur(props.input.value)}
                                options={this.state.tags}
                                placeholder="Select or Create Zero or More Tags"
                                simpleValue
                                multi={true}
                                                                label="Select or Create Zero or More Tags"

                            />
                            }
                    />
                    </FormGroup>

<FormGroup>
                    <Field name="notes" type="text" component={renderBSTextField} label="Additional Notes"/>
           </FormGroup>
                </FormSection>
                <div>
                    <button type="button" className="previous" onClick={this.props.previousPage}>Previous</button>
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