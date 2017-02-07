import React, {PropTypes} from 'react';
import {renderMainType, renderTags, renderSubtypes} from './utils/transformThingInformation'


const ThingFull = ({headline, thing: {description_how, description_what, notes,
  main_type, subtypes, tags} })=> {
  debugger;
  return (
    <div>
      <h2> Description of {headline}</h2>
      {description_how &&
      <div>
        <h3> Way of acquiring {headline} </h3>
        {description_how}
      </div>}
      {description_what &&
      <div> <h3>Description of {headline}</h3>
        {description_what}
      </div>}
      <div>
        {renderMainType(main_type)}
      </div>
      {subtypes &&
      <div>
        {renderSubtypes(subtypes)}
      </div>
      }
      {tags && JSON.parse(tags).length > 0 &&    // hack
      <div>
        {renderTags(tags)}
      </div>
      }
      {notes && <div><h3>Notes:</h3>{notes}</div>}
    </div>
  );
};


ThingFull.propTypes = {
  thing: PropTypes.object.isRequired
};

export default ThingFull;


/*    main_type: PropTypes.string.isRequired,
 subtypes: PropTypes.arrayOf(PropTypes.string).isRequired,
 description_how: PropTypes.string,
 description_what: PropTypes.string,
 notes: PropTypes.string,
 tags: PropTypes.arrayOf(PropTypes.string)
 */
