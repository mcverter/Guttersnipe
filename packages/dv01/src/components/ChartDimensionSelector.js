import React from "react";
import PropTypes from "prop-types";

const ChartDimensionSelector = ({selected, options, handleSelection}) => {
  return (
    <div style={styles.container}>
      <select value={selected} onChange={handleSelection}>
        {options.map(o=> <option value={o}>{o}</option>)}
      </select>
    </div>
  );
};
const styles = {
  container: {}
};

ChartDimensionSelector.propTypes = {
};

export default ChartDimensionSelector;
