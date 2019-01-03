import React from "react";

import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

const GsButton = ({ onPress, title, styleText, styleContainer }) => {
  return (
    <RaisedButton onPress={onPress} style={styleContainer}>
      <div style={styleText}>{title}</div>
    </RaisedButton>
  );
};

GsButton.propTypes = {};

export default GsButton;
