import React, {PropTypes} from 'react';

const ThingFull = ({description_how, description_what, notes,
    main_type, subtypes, tags}) => (
    <div>

                <div>{description_how}</div>
            <div>{description_what} </div>
        <div>{main_type}</div>
        <div>{subtypes}</div>
        <div>{tags} </div>
        <div>{notes}</div>

    </div>
);

ThingFull.propTypes = {
    main_type: PropTypes.string.isRequired,
    subtypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    description_how: PropTypes.string,
    description_what: PropTypes.string,
    notes: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
};

export default ThingFull;

/*
        <Description
            how={description_how}
            what={description_what} />
        <Taxonomy
            type={main_type}
            subtypes={subtypes }/>
        <Tags
            tags={tags} />
        <ThingNotes
            notes={notes} />

 */