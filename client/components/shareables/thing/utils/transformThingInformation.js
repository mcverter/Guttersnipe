import React from 'react';
import Button from 'react-bootstrap/lib/Button';


const renderArrayedLabels = (categories, label, style) => {
  if (categories && categories.length) {
    categories = JSON.parse(categories.replace(/'/g, '"'));  // workaround
    return (
      <div>
        <h3>{label}</h3>
        {categories.map((cat)=>{
          return <Button bsStyle={style} key={cat}>{cat}</Button>;})}
      </div>);
  }
};


export const renderMainType = (main_type) => {
  return (
    <div>
      <h2>Main Type</h2>
      <Button bsSize="large" bsStyle="success">{main_type.name}</Button>
    </div>
  );
};

export const renderSubtypes = (subtypes) => (
  renderArrayedLabels(subtypes, "SubTypes", "info")
);

export const renderTags = (tags) => (
  renderArrayedLabels(tags, "Tags", "warning")
);
