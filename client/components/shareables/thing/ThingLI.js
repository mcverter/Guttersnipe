import React, {PropTypes} from 'react';

const ThingLI = ({thing}) => {
    let {main_type, subtypes, tags} = thing;
    return (
        <dl>
            <dt>Type</dt>
            <dd>{main_type.name}</dd>
            <dt>Subtypes</dt>
            <dd>{subtypes}</dd>
            <dt>Tags</dt>
            <dd>{tags}</dd>
        </dl>
    );
};


ThingLI.propTypes = {
    thing: PropTypes.object.isRequired
};

export default ThingLI;

