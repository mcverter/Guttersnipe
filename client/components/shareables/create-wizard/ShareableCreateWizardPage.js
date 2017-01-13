import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import ShareableCreateWizardForm from './ShareableCreateWizardForm';
import {createShareable} from '../../../actions/shareableActions.js';

class ShareableCreateWizardPage extends Component {
    handleSubmit (values) {
        debugger;
        values = {
            headline: 'example',
            summary: 'this is a dummy example',
            shareable_notes: 'these are dummy notes',
            description_how: 'this is a dummy description how',
            description_what: 'this is a dummy description what ',
            main_type: 'dumb',
            subtypes: ['dumber', 'dumbest'],
            tags: ['doy', 'dur'],
            thing_notes: 'i noted the thing',
            longitude: '-73.99355',
            latitude: '40.677613',
            canonical_address: '10 Court St  Brooklyn, NY 11201 ',
            alternate_names: '',
            space_notes: 'i noted the space',
            dt_start: '2016-12-09T18:00:00',
            dt_end: '2016-12-09T20:00:00',
            days_of_week: 'mo',
            time_notes: 'I noted the time'
        }
        const data = {
            'headline' : values.headline,
            'summary'  : values.summary,
            'thing'    : {
                'description_how' : values.description_how,
                'description_what' : values.description_what,
                'main_type': values.main_type,
                'subtypes': values.subtypes,
                'notes': values.thing_notes
            },
            'space'    : {
                'longitude' : values.longitude,
                'latitude': values.latitude,
                'canonical_address': values.canonical_address,
                'alternate_addresses': values.alternate_addresses,
                'notes': values.space_notes
            },
            'time'    : {
                'notes': values.time_notes,
                'calendar': {
                    'events': [
                        {
                            'dt_start': values.dt_start,
                            'dt_end': values.dt_end,
                            'tz_id': 'America/New_York',
                            'recurrence_rule': {
                                'freq': 'weekly',
                                'byDay': values.days_of_week
                            }
                        }
                    ]
                }
            }
        };
        // Do something with the form values
        console.log('form values', values);
        console.log('data object', data)
        createShareable(data);
    }

    render() {
//        this.handleSubmit = this.handleSubmit.bind(this);
        return (
            <ShareableCreateWizardForm onSubmit={this.handleSubmit} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        shareable: state.shareable
    };
}


export default connect(mapStateToProps, {createShareable})(ShareableCreateWizardPage);


