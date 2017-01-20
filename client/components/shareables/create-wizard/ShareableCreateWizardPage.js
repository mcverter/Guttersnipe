import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import ShareableCreateWizardForm from './ShareableCreateWizardForm';
import {createShareable} from '../../../actions/shareableActions.js';

class ShareableCreateWizardPage extends Component {
    handleSubmit (values) {
        // Do something with the form values
        console.log('form values', values);

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
        };
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
        console.log('data object', data);
        createShareable(data);
    }

    render() {
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


/*
1.	description_how:"wojoij"
2.	description_what:"aow"
3.	event_chooser:Array[3]
    1.	0:Object
        1.	dt_end:"2017-01-02T22:00:00-05:00"
        2.	dt_start:"2017-01-02T18:00:00-05:00"
        3.	headline:"foo"
        4.	__proto__:Object
    2.	1:Object
    3.	2:Object
        1.	dt_end:"2017-01-04T11:30:00-05:00"
        2.	dt_start:"2017-01-04T09:30:00-05:00"
        3.	recurrence_rule:Object
            1.	byDay:"we"
            2.	freq:"weekly"
            3.	__proto__:Object
        4.	tz_id:"America/New_York"
    5.	__proto__:Object
    4.	length:3
    5.	__proto__:Array[0]
4.	headline:"hello world"
5.	location_chooser:Object
    1.	canonicalAddress:"201 A 6 Avenue, Brooklyn, New York, NY, USA"
    2.	latitude:40.675659
    3.	longitude:-73.977636
    4.	__proto__:Object
6.	shareable_notes:"no more notes"
7.	space_notes:"no more"
8.	subtypes:"hae"
9.	summary:"goodbye world"
10.	tags:"death"
11.	thing_notes:"meth"
12.	type:"lov"
13.	__proto__:Object

 */