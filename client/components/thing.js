
import React, {PropTypes} from 'react';

const Thing = (props) => (
    <div>
        <Description
            how=props.description_how
            what=props.description_what />
        <Taxonomy
            type=props.main_type
            subtypes=props.subtypes />
        <Tags
            tags=props.tags />
        <ThingNotes
            notes=props.notes />
    </div>

)
