import React, {PropTypes} from 'react';
import {renderMainType, renderTags, renderSubtypes} from './utils/transformThingInformation';
import Panel from 'react-bootstrap/lib/Panel'

const summaryStyle = {

  width: '80%',
  'font-size': '150%',
  'backgroundColor': 'lightgray'
};

const SummaryMobile = (summary) => {
  debugger;
  if (summary) {
    return(
      <div style={summaryStyle}>
        <h3>Summary</h3>
        {summary}
      </div>
    )
  }
  else {
    return (<span></span>);
  }
};


const style = {
  width: '80%',
  'font-size': '150%',
  'backgroundColor': 'lightgray'
};


const ThingMobile = (props) => {
  const {headline, summary, thing: {
    description_how, description_what,
    notes, main_type, subtypes, tags} } = props;
  console.log(props);

  const subtype = subtypes[0]

  console.log( headline, summary, main_type, subtype,
     description_how, description_what, notes)
  debugger;

  return (
    <Panel className="thing-mobile" header="Thing">
      <h3> {headline} </h3>
      <h4>{main_type.name}:  dumpster</h4>
      {summary &&
      <div style={summaryStyle}>
        <h3>Summary</h3>
        {summary}
      </div>}

      {description_how  &&
      <div>
        <h4> Way of acquiring {headline} </h4>
        {description_how}
      </div>}
      {description_what &&
      <div> <h4>Description of {headline}</h4>
        {description_what}
      </div>}
      {notes && <div><h3>Notes:</h3>{notes}</div>}
    </Panel>
  );
};


ThingMobile.propTypes = {
  thing: PropTypes.object,
  headline: PropTypes.string
};

export default ThingMobile;
