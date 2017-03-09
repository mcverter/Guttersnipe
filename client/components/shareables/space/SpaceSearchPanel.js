import React, {PropTypes, Component} from "react";
import MapWithGeocoderInput from './MapWithGeocoderInput';
import Select from 'react-select';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'


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
      options: options,
      showPanel: false
    };
  }
  componentWilReceiveProps(props) {
    debugger;
     if (nextProps.isActiveView && this.map) {
      this.map.leafletElement.invalidateSize(false);
    }
  }

  render() {
    return (
      <div id="space-search-panel">
        <Button onClick={ ()=> this.setState({showPanel: !this.state.showPanel })}>
          Filter by Space
        </Button>

        <Panel heading="Filter By Space"
               collapsible expanded={this.state.showPanel}>

          <h2> Pick a center for your search </h2>

          <Field name="space_map"
                 component={props =>
                   <ReduxFormComponentField
                     meta={props.meta}
                     label="Choose Center">
                     <MapWithGeocoderInput
                       forceRedraw = {this.state.showPanel}
                       ref={(map) => { this.map = map; }}
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
        </Panel>
      </div>
    );
  }
}

export default SpaceSearchPanel;
