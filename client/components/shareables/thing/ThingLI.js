import React, {PropTypes, Component} from 'react';
import {renderMainType, renderTags, renderSubtypes} from './utils/transformThingInformation'

const ThingLI = ({thing: {main_type, subtypes, tags}}) => (
  <div>
    {renderMainType(main_type)}
    {renderSubtypes(subtypes)}
    {renderTags(tags)}
  </div>
);



ThingLI.propTypes = {
  thing: PropTypes.object.isRequired
};

export default ThingLI;

