import React, {PropTypes} from "react";
import {connect} from "react-redux";
import ShareableCreateWizardForm from "./ShareableCreateWizardForm";
import {createShareable} from "../../../actions/shareableActions.js";

const ShareableCreateWizardPage = () => {
  const handleSubmit = (values) => {
    console.log('form values', values);
    debugger;

    const data = {
      'headline' : values.headline,
      'summary'  : values.summary,
      'thing'    : {
        'description_how' : values.description_how,
        'description_what' : values.description_what,
        'main_type': values.thing_type,
        'subtypes': values.thing_subtypes.split(','),
        'notes': values.thing_notes,
        'tags': values.thing_tags.split(',')
      },
      'space'    : {
        'longitude' : values.space_creator.longitude,
        'latitude':  values.space_creator.latitude,
        'canonical_address':  values.space_creator.canonical_address,
        'alternate_addresses': values.alternate_addresses,
        'notes': values.space_notes
      },
      'time'    : {
        'notes': values.time_notes,
        'calendar': {
          'events': values.time_creator
        }
      }
    };
    console.log('data object', data);
    createShareable(data);
  };

  return (
    <ShareableCreateWizardForm onSubmit={handleSubmit} />
  );
};

function mapStateToProps(state) {
  return {
    shareable: state.shareable
  };
}

export default connect(mapStateToProps, {createShareable})(ShareableCreateWizardPage);
