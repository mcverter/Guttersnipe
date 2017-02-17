import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import { connect } from 'react-redux'
import MapWithGeocoderInput from './MapWithGeocoderInput';
import Select from 'react-select';

import { Field } from 'redux-form';
import ReduxFormComponentField from '../../reduxFormInputs/ReduxFormComponentField';

class SpaceSearchPanel extends Component {

  constructor(props) {
    super(props);
    const METERS_TO_MILE =1609.34;
    const METERS_TO_FOOT = 0.3048;
    const options = [
      { value: 500*METERS_TO_FOOT, label: '500 Feet' },
      { value: 0.5 * METERS_TO_MILE, label: 'Half a mile' },
      { value: METERS_TO_MILE, label: '1 mile' },
      { value: 2 * METERS_TO_MILE, label: '2 miles' },
      { value: 5 * METERS_TO_MILE, label: '5 miles' },
      { value: 10 * METERS_TO_MILE, label: '10 miles' },
    ];

    this.state = {
      options: options
    }

    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    console.log('value', value);
  }

  render() {
//    const position = this.props.location;
    return (
      <div>
        <h2> Pick a center for your search </h2>

        <Field name="space_map"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Choose Center">
                   <MapWithGeocoderInput
                     formInput={props.input}
                   />
                 </ReduxFormComponentField>}/>


        <h2> Pick a radius for your search </h2>

        <Field name="space_radius"
               component={props =>
                 <ReduxFormComponentField
                   meta={props.meta}
                   label="Types">
                   <Select
                     value={props.input.value}
                     onChange={props.input.onChange}
                     onBlur={() => props.input.onBlur(props.input.value)}
                     options={this.state.options}
                     placeholder="Pick a radius"
                     simpleValue/>
                 </ReduxFormComponentField>} />

      </div>
    )
  }
}

export default SpaceSearchPanel;
