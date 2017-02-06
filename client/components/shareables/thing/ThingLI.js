import React, {PropTypes, Component} from 'react';
import Button from 'react-bootstrap/lib/Button';


class ThingLI extends Component {

  renderArrayedLabels(attributes, label, style) {
    if (attributes && attributes.length) {
      attributes = JSON.parse(attributes.replace(/'/g, '"'));  // workaround
      return (
        <div>
          <h3>{label}</h3>
          {attributes.map((attr)=>{
            console.log("attr is ", attr);
            return <Button bsStyle={style} key={attr}>{attr}</Button>})}
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
    console.log('boo', boo);
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

