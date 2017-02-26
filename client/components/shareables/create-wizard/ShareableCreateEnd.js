import React, {PropTypes} from 'react';

import SpaceFull from '../space/SpaceFull';
import TimeFull from '../time/TimeFull';
import ThingFull from '../thing/ThingFull';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validateCreateShareableWizard';
import {connect} from 'react-redux';
import ReduxFormHTMLInput from '../../reduxFormInputs/ReduxFormHTMLInput';
import Button from 'react-bootstrap/lib/Button';

export let ShareableCreateEnd = ({handleSubmit, previousPage, shareable,
  goToThingEdit, goToTimeEdit, goToSpaceEdit}) => {


  let {headline, summary, number_ratings, total_rating,
    thing, space, time, notes, comments} = shareable;
  return (
    <form className="shareable-create-end" onSubmit={handleSubmit}>
      <div className="jumbotron"> {headline} </div>

      {summary && <div><h3>Summary</h3>{summary} </div>}

      {number_ratings ? <div><h3>Rating</h3> {total_rating/number_ratings} </div>:''}
      <div>
      <ThingFull thing={thing} headline={headline}/>
      <Button type="button" onClick={goToThingEdit}> Edit Thing </Button>
      </div>
      <div>
      <SpaceFull space={space} headline={headline}/>
      <Button type="button" onClick={goToSpaceEdit}> Edit Space </Button>
      </div>

      <div>
      <TimeFull time={time} headline={headline}/>
      <Button type="button" onClick={goToTimeEdit}>  Edit Time </Button>
      </div>

      {notes && <div><h3>Notes:</h3> {notes} </div>}
      <Button type="button" className="previous" onClick={previousPage}>Previous</Button>
      <Button type="button" className="next" onClick={handleSubmit}>Create New Shareable</Button>
    </form>
  );
};

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

/*
"['dumpster']"
"{"longitude": 40.689613, "latitude": -73.99243}"
 */
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
