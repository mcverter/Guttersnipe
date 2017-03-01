import React, {PropTypes, Component} from 'react';

import { Field, reduxForm , formValueSelector} from 'redux-form';
import validate, {required} from '../create-wizard/validateCreateShareableWizard';

import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import ReduxFormTextArea from '../../reduxFormInputs/ReduxFormTextArea';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Select, {Creatable} from 'react-select';
import {fetchShareableCategorizations} from '../../../actions/shareables/shareableActions';
import {connect} from 'react-redux';

class ThingEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: undefined,
      types: undefined,
      subtypes: undefined
    };
    console.log('props.meta', props.categorizationMeta);
    this.categorizationMetaToSelectOptions(props.categorizationMeta);

    this.handleTypesChange = this.handleTypesChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchShareableCategorizations();
  }

  componentWillReceiveProps(nextProps) {
    this.categorizationMetaToSelectOptions(nextProps.categorizationMeta)
  }

  componentDidMount() {
    this.categorizationMetaToSelectOptions(this.props.categorizationMeta)
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

  handleTypesChange(value, formChangeFn) {
    formChangeFn(value);
    this.setState({
      subtypes: _.find(this.state.types, {value: value}).subtypes
    });
  }

  render() {
    console.log('rendering', this.state)

    if (this.state.types === undefined) {return <div>Loading</div>;}
    return (
      <Panel className="thing-create-panel">
        <form className="thing-create-form" onSubmit={this.props.handleSubmit}>
          <h2> Describe and Categorize {this.props.headline} </h2>
          <Field validate={required} name="thing_description_what" type="text" component={ReduxFormTextArea} label="What is the shareable resource"/>
          <Field validate={required} name="thing_description_how" type="text" component={ReduxFormTextArea} label="How do you acquire it?"/>

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
                     label="Subtypes">
                     <Select
                       value={props.input.value}
                       onChange={props.input.onChange}
                       onBlur={() => props.input.onBlur(props.input.value)}
                       options={this.state.subtypes}
                       placeholder="Select Zero or More Subtypes"
                       multi={true}
                       simpleValue
                       tabSelectsValue={false} />
                   </ReduxFormComponentField>} />


          <Field name="thing_tags"
                 component={props =>
                   <ReduxFormComponentField
                     meta={props.meta}
                     label="Tags">
                     <Select
                       value={props.input.value}
                       onChange={props.input.onChange}
                       onBlur={() => props.input.onBlur(props.input.value)}
                       options={this.state.subtypes}
                       placeholder="Select Zero or More Tags"
                       multi={true}
                       simpleValue
                       tabSelectsValue={false} />
                   </ReduxFormComponentField>} />


          <Field name="thing_notes" type="text" component={ReduxFormTextArea} label="Additional Notes"/>
        </form>
      </Panel>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShareableCategorizations: () => {dispatch(fetchShareableCategorizations())}
  }
}

function mapStateToProps(state) {
  console.log('mapping state to props', state.shareables.categorizationMeta)
  return {
    categorizationMeta: state.shareables.categorizationMeta
  };
}


ThingEdit.propTypes = {
  handleSubmit: PropTypes.func,
  categorizationMeta: PropTypes.object,
  fetchShareableCategorizations: PropTypes.func,
  previousPage: PropTypes.func
};

const selector = formValueSelector('wizard');
ThingEdit = connect(
  state => {
    return {
      headline: selector(state, 'headline')
    };
  }
)(ThingEdit);


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(ThingEdit));
