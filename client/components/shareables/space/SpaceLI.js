import React, {PropTypes} from 'react';

const SpaceLI = ({space}) => {
    const {canonical_address} = space;

    return (
        <div>
        {canonical_address}
        </div>
    );
};

SpaceLI.propTypes = {
};

export default SpaceLI;

