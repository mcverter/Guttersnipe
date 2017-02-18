import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';
import Select, {Creatable} from 'react-select';
import { Field} from 'redux-form';
import {fetchShareableCategorizations} from '../../../actions/shareables/shareableActions';
import _ from 'lodash';

class ThingSearchPanel extends Component {
constructor(props) {
    super(props);

    this.state = {
      tags: undefined,
      types: undefined,
      subtypes: undefined
    };
    this.categorizationMetaToSelectOptions(props.categorizationMeta);

    this.handleTypesChange = this.handleTypesChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchShareableCategorizations();
  }

    componentWillReceiveProps(nextProps) {
    this.categorizationMetaToSelectOptions(nextProps.categorizationMeta);
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
      });
    }, [])});
  }

  handleTypesChange(value, formChangeFn) {
    formChangeFn(value);
    this.setState({
      subtypes: _.find(this.state.types, {value: value}).subtypes
    });
  }


  render() {
    return (
      <div>
        <h2>  Search by Main Type</h2>
                <Field name="thing_type"
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


        <h2> Search by Subtypes</h2>
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

        <h2> Search by Tags </h2>

                <Field name="thing_tags"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Select or Create Zero or More Tags" >
                   <Select
                     value={props.input.value}
                     onChange={props.input.onChange}
                     onBlur={() => props.input.onBlur(props.input.value)}
                     options={this.state.tags}
                     placeholder="Select or Create Zero or More Tags"
                     simpleValue
                     multi={true} />
                 </ReduxFormComponentField>}/>
      </div>
    )
  }
}

ThingSearchPanel.propTypes = {
  categorizationMeta: PropTypes.object,
  fetchShareableCategorizations: PropTypes.func
};

function mapStateToProps(state) {
  return {
    categorizationMeta: state.shareables.categorizationMeta
  };
}

export default connect(mapStateToProps,
  {fetchShareableCategorizations})(ThingSearchPanel);


