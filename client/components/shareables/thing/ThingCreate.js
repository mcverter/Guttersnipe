import React, {PropTypes, Component} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import {RenderCreatableField, RenderBSTextField, RenderSelectField} from '../create-wizard/renderField';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';


// temporary
import {tags, types_and_subtypes} from './TagsAndTypes';

class ThingCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: tags,
      types: types_and_subtypes,
      subtypes: _.find(types_and_subtypes, {value: "food"}).subtypes
    };

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
        <Field validate={required} name="thing_description_what" type="text" component={RenderBSTextField} label="What is the shareable resource"/>
        <Field validate={required} name="thing_description_how" type="text" component={RenderBSTextField} label="How do you acquire it?"/>

        <Field name="thing_type"
               validate={required}
               component={props =>
                 <RenderSelectField
                   meta={props.meta}
                   value={props.input.value}
                   onChange={(value)=> this.handleTypesChange(value, props.input.onChange)}
                   onBlur={() => props.input.onBlur(props.input.value)}
                   options={this.state.types}
                   placeholder="Select a Type"
                   simpleValue
                   label="Types" /> } />

        <Field name="thing_subtypes"
               component={props =>
                 <RenderSelectField
                   meta={props.meta}
                   value={props.input.value}
                   onChange={props.input.onChange}
                   onBlur={() => props.input.onBlur(props.input.value)}
                   options={this.state.subtypes}
                   placeholder="Select Zero or More Subtypes"
                   multi={true}
                   simpleValue
                   label="subtypes" /> } />

        <Field name="thing_tags"
               component={props =>
                 <RenderCreatableField
                   value={props.input.value}
                   onChange={props.input.onChange}
                   onBlur={() => props.input.onBlur(props.input.value)}
                   options={this.state.tags}
                   placeholder="Select or Create Zero or More Tags"
                   simpleValue
                   multi={true}
                   label="Select or Create Zero or More Tags" /> } />

        <Field name="thing_notes" type="text" component={RenderBSTextField} label="Additional Notes"/>

        <div>
          <Button type="button" className="previous" onClick={this.props.previousPage}>Previous</Button>
          <Button type="submit" className="next">Next</Button>
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

