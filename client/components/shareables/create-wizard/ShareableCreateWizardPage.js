import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import ShareableCreateWizardForm from './ShareableCreateWizardForm';
import {createShareable} from '../../../actions/shareableActions.js';

class ShareableCreateWizardPage extends Component {

    handleSubmit (values) {
        // Do something with the form values
        console.log('form values', values);
        debugger;

        const data = {
            'headline' : values.headline,
            'summary'  : values.summary,
            'thing'    : {
                'description_how' : values.description_how,
                'description_what' : values.description_what,
                'main_type': values.main_type,
                'subtypes': values.subtypes.split(','),
                'notes': values.thing_notes,
                'tags': values.tags.split(',')
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
1.	Object
4.	shareable_notes:"add note"
5.	space_creator:Object
1.	canonicalAddress:"67 Wine, Manhattan, New York, NY, USA"
2.	latitude:40.774673
3.	longitude:-73.980569
4.	__proto__:Object
6.	space_notes:"Lots of notes"
7.	subtypes:"dumpster,face"
9.	tags:"frown"
11.	time_creator:Array[1]
1.	0:Object
1.	dt_end:"2017-01-11T21:00:00-05:00"
2.	dt_start:"2017-01-11T18:00:00-05:00"
3.	headline:"foo"
4.	__proto__:Object
2.	length:1
3.	__proto__:Array[0]
12.	time_notes:"More more more"


 */