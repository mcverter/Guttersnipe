import React from 'react';
import Button from 'react-bootstrap/lib/Button';


const renderArrayedLabels = (categories, label, style) => {
  if (categories && categories.length) {
        categories = JSON.parse(categories.replace(/'/g, '"'));  // workaround
    return (
      <div>
        <h5>{label}</h5>
        {categories.map((cat)=>{
          return <Button bsSize="xs" bsStyle={style} key={cat}>{cat}</Button>;})}
      </div>);
  }
};


export const renderMainType = (main_type) => {
  return (
    <div>
      <h4>Main Type</h4>
      <Button bsSize="sm" bsStyle="success">{main_type.name}</Button>
    </div>
  );
};

export const renderSubtypes = (subtypes) => (
  renderArrayedLabels(subtypes, "SubTypes", "info")
);

export const renderTags = (tags) => (
  renderArrayedLabels(tags, "Tags", "warning")
);
