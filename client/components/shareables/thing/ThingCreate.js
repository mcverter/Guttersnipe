import React, {PropTypes, Component} from 'react';

import { Field, reduxForm } from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Select, {Creatable} from 'react-select';
import {fetchShareableCategorizations} from '../../../actions/shareables/shareableActions';
import {connect} from 'react-redux';

class ThingCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: undefined,
      types: undefined,
      subtypes: undefined
    };
    this.categorizationMetaToSelectOptions(props.categorizationMeta)

    this.handleTypesChange = this.handleTypesChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchShareableCategorizations()
  }

  categorizationMetaToSelectOptions(categorizationMeta) {
    if (!categorizationMeta || ! _.keys(categorizationMeta).length){
      return;
    }
    this.setState({
      tags: categorizationMeta.tags.map(tag =>{
        return  {value: tag,  label: tag};
      }),
      types: _.keys(categorizationMeta).reduce((accumulator, typeKey) => {
      return accumulator.concat({
        value: typeKey, label: typeKey,
        subtypes: categorizationMeta[typeKey].map(subKey => {
          return {value: subKey,  label: subKey};
        })
      })
    }, [])});
  }

  componentWillReceiveProps(nextProps) {
    this.categorizationMetaToSelectOptions(nextProps.categorizationMeta)
  }


  handleTypesChange(value, formChangeFn) {
    formChangeFn(value);
    this.setState({
      subtypes: _.find(this.state.types, {value: value}).subtypes
    });
  }

  render() {
    if (this.state.types === undefined) {return <div>Loading</div>;}
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field validate={required} name="thing_description_what" type="text" component={ReduxFormHTMLInput} label="What is the shareable resource"/>
        <Field validate={required} name="thing_description_how" type="text" component={ReduxFormHTMLInput} label="How do you acquire it?"/>

        <Field name="thing_type"
               validate={required}
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Types">
                   <Select
                     value={props.input.value}
                     onChange={(value)=> this.handleTypesChange(value, props.input.onChange)}
                     onBlur={() => props.input.onBlur(props.input.value)}
                     options={this.state.types}
                     placeholder="Select a Type"
                     simpleValue/>
                 </ReduxFormComponentField>} />

        <Field name="thing_subtypes"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="subtypes">
                   <Select
                     value={props.input.value}
                     onChange={props.input.onChange}
                     onBlur={() => props.input.onBlur(props.input.value)}
                     options={this.state.subtypes}
                     placeholder="Select Zero or More Subtypes"
                     multi={true}
                     simpleValue />
                 </ReduxFormComponentField>} />

        <Field name="thing_tags"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Select or Create Zero or More Tags" >
                   <Creatable
                     value={props.input.value}
                     onChange={props.input.onChange}
                     onBlur={() => props.input.onBlur(props.input.value)}
                     options={this.state.tags}
                     placeholder="Select or Create Zero or More Tags"
                     simpleValue
                     multi={true} />
                 </ReduxFormComponentField>}/>

        <Field name="thing_notes" type="text" component={ReduxFormHTMLInput} label="Additional Notes"/>

        <div>
          <Button type="button" className="previous" onClick={this.props.previousPage}>Previous</Button>
          <Button type="submit" className="next">Next</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    categorizationMeta: state.shareables.categorizationMeta
  }
}


ThingCreate.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps, {fetchShareableCategorizations})(reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(ThingCreate));

