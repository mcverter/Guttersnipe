import React, {Component, PropTypes} from 'react';

import SpaceFull from '../space/SpaceFull';
import SpaceEdit from '../space/SpaceEdit';

import {browserHistory} from 'react-router';
import TimeFull from '../time/TimeFull';
import TimeEdit from '../time/TimeEdit';

import ThingFull from '../thing/ThingFull';
import ThingEdit from '../thing/ThingEdit'

import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validateCreateShareableWizard';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';


class ShareableCreateEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeEdit: false,
      spaceEdit: false,
      timeEdit:false,
    }
    this.toggleSpaceEdit = this.toggleSpaceEdit.bind(this);
    this.toggleThingEdit = this.toggleThingEdit.bind(this);
    this.toggleTimeEdit = this.toggleTimeEdit.bind(this);
    this.redirectToList = this.redirectToList.bind(this);

  }
   redirectToList() {
    browserHistory.push('/shareables');

  }
  toggleSpaceEdit(){
    this.setState({
      spaceEdit: !this.state.spaceEdit
    })
  }

  toggleTimeEdit(){
    this.setState({
      timeEdit: !this.state.timeEdit
    })
  }

  toggleThingEdit(){
    this.setState({
      thingEdit: !this.state.thingEdit
    })
  }


  render() {
    let {
      headline, summary, number_ratings, total_rating,
      thing, space, time, notes, comments
    } = this.props.shareable;
    return (
      <Panel id="shareable-create-end">
        <form onSubmit={this.props.handleSubmit}>
          <div className="jumbotron"> Headline: {headline} </div>

          {summary && <div><h3>Summary</h3>{summary} </div>}

          {number_ratings ? <div><h3>Rating</h3> {total_rating / number_ratings} </div> : ''}
          <Panel>
            <Button type="button" onClick={this.toggleThingEdit}>
              {this.state.thingEdit ? "Confirm Thing" : "Edit Thing"}
            </Button>
            {this.state.thingEdit ?
              <ThingEdit /> :
              <ThingFull thing={thing} headline={headline}/>}
          </Panel>

          <Panel>
            <Button type="button" onClick={this.toggleSpaceEdit}>
              {this.state.spaceEdit ? "Confirm Space" : "Edit Space"}
            </Button>
            {this.state.spaceEdit ?
              <SpaceEdit /> :
              <SpaceFull space={space} headline={headline}/>}
          </Panel>

          <Panel>
            <Button type="button" onClick={this.toggleTimeEdit}>
              {this.state.timeEdit ? "Confirm Time" : "Edit Time" }</Button>
            {this.state.timeEdit ?
              <TimeEdit></TimeEdit> :
              <TimeFull time={time} headline={headline}/> }

          </Panel>

          {notes && <div><h3>Notes:</h3> {notes} </div>}
          <div className="wizard-navigation-buttons">
            <div>
              <Button type="button" id="create-shareable-submit-btn" bsSize="large" bsStyle="primary" onClick={this.props.handleSubmit}>Create New Shareable</Button>
            </div>
            <div>
              <Button type="button" className="previous" bsSize="Cancel" bsStyle="danger" onClick={this.redirectToList}>Cancel</Button>
            </div>
          </div>
        </form>
      </Panel>
    );
  }
}
ShareableCreateEnd.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};


const selector = formValueSelector('wizard'); // <-- same as form name
ShareableCreateEnd = connect(
  state => {
    function transformCategoriesToArray(categories) {
      if (categories === undefined)
        return undefined;
      return "['" + categories + "']";
    }
    return  {
      shareable :{
        headline : selector(state, 'headline'),
        summary  : selector(state, 'summary'),
        notes    : selector(state, 'shareable_notes'),
        thing    : {
          description_how : selector(state, 'thing_description_how'),
          description_what :selector(state, 'thing_description_how'),
          main_type: {name: selector(state, 'thing_type')},
          subtypes: transformCategoriesToArray(selector(state, 'thing_subtypes')),
          notes: selector(state, 'thing_notes')
        },
        space    : {
          position:'{"longitude":' + selector(state, 'space_map.longitude') + ','
          + '"latitude":' + selector(state, 'space_map.latitude') + '}',
          longitude : selector(state, 'space_map.longitude'),
          latitude: selector(state, 'space_map.latitude'),
          canonical_address: selector(state, 'values.space_map.canonicalAddress'),
          notes: selector(state, 'space_notes')
        },
        time    : {
          notes : selector(state, 'time_notes'),
          schedule : {
            events: selector(state, 'time_calendar')
          }
        }}
    };
  }
)(ShareableCreateEnd);

ShareableCreateEnd.propTypes = {
  shareable: PropTypes.object,
  goToThingEdit: PropTypes.func,
  goToTimeEdit: PropTypes.func,
  goToSpaceEdit: PropTypes.func
}

export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(ShareableCreateEnd);


/**
 *
 * {
  "time": {
    "calendar": {
      "events": [
        {
          "dt_start": "2017-01-30T18:00:00",
          "tz_id": "America/New_York",
          "dt_end": "2017-01-30T18:30:00",
          "headline": "foo"
        }
      ]
    }
  },
  "headline": "foo"
}
 * {
  "time": {
    "calendar": {
      "events": [
        {
          "dt_start": "2017-01-30T18:00:00",
          "tz_id": "America/New_York",
          "dt_end": "2017-01-30T18:30:00",
          "headline": "foo"
        }
      ]
    }
  },
  "headline": "foo"
}


 * {
  "id": 1,
  "notes": "Lately (fall 2012), usually not until about midnight; sometimes earlier.",
  "schedule": {
    "events": [
      {
        "dt_end": "2016-12-12T02:00:00+00:00",
        "dt_start": "2016-12-12T00:00:00+00:00",
        "id": 1,
        "recurrence_rule": {
          "byDay": "su,mo,tu,we,th,fr,sa",
          "byMonth": null,
          "byMonthDay": null,
          "bySetPos": null,
          "byWeekNo": null,
          "byYearDay": null,
          "count": null,
          "freq": "weekly",
          "id": 1,
          "interval": 1,
          "until": null
        },
        "tz_id": "America/New_York"
      }
    ],
    "id": 1
  }
}
 */
