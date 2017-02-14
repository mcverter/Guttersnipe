import React, {PropTypes} from "react";
import {connect} from "react-redux";
import ShareableCreateWizardForm from "../../shareables/create-wizard/ShareableCreateWizardForm";
import {createShareable} from "../../../actions/shareables/shareableActions.js";

const ShareableCreateWizardPage = () => {
  const handleSubmit = (values) => {
    const data = {
      'headline' : values.headline,
      'summary'  : values.summary,
      'notes'    : values.shareable_notes,
      'thing'    : {
        'description_how' : values.thing_description_how,
        'description_what' : values.thing_description_what,
        'main_type': values.thing_type,
        'subtypes': values.thing_subtypes.split(','),
        'notes': values.thing_notes,
        'tags': values.thing_tags.split(',')
      },
      'space'    : {
        'longitude' : values.space_map.longitude,
        'latitude':  values.space_map.latitude,
        'canonical_address':  values.space_map.canonicalAddress,
        'alternate_addresses': values.space_map.alternate_addresses,
        'notes': values.space_notes
      },
      'time'    : {
        'notes': values.time_notes,
        'calendar': {
          'events': values.time_calendar
        }
      }
    };
    createShareable(data);
  };

  return (
    <ShareableCreateWizardForm handleSubmit={handleSubmit} />
  );
};

function mapStateToProps(state) {
  return {
    shareable: state.shareable
  };
}

export default connect(mapStateToProps, {createShareable})(ShareableCreateWizardPage);
