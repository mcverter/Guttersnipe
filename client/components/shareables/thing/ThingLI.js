import React, {PropTypes, Component} from 'react';
import Button from 'react-bootstrap/lib/Button';


class ThingLI extends Component {

  renderArrayedLabels(categories, label, style) {
    if (categories && categories.length) {
      categories = JSON.parse(categories.replace(/'/g, '"'));  // workaround
      return (
        <div>
          <h3>{label}</h3>
          {categories.map((cat)=>{
            return <Button bsStyle={style} key={cat}>{cat}</Button>})}
        </div>
      )}}


  renderMainType(main_type) {
    return (
      <div>
        <h2>Main Type</h2>
        <Button bsSize="large" bsStyle="success">{main_type.name}</Button>
      </div>
    )
  }

  renderSubtypes(subtypes) {
    return this.renderArrayedLabels(subtypes, "SubTypes", "info")
  }

  renderTags(tags) {
    return this.renderArrayedLabels(tags, "Tags", "warning")
  }

  render() {
    const {thing: {main_type, subtypes, tags}} = this.props;
    const boo = this.renderSubtypes(subtypes);
    return (
      <div>
        {this.renderMainType(main_type)}
        {this.renderSubtypes(subtypes)}
        {this.renderTags(tags)}
      </div>
    );
  }
}

ThingLI.propTypes = {
  thing: PropTypes.object.isRequired
};

export default ThingLI;

