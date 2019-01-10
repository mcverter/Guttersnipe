import React from "react";
import PropTypes from "prop-types";

const ChartTypeChooser = ({chartType, handleOptionChange}) => {
  return (
    <div style={styles.container}>
      <div className="radio">
        <label>
          <input type="radio" value="Bar"
                 checked={chartType === 'Bar'}
                 onChange={handleOptionChange} />
          Bar
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" value="Line"
                 checked={chartType === 'Line'}
                 onChange={handleOptionChange} />
          Line
        </label>
      </div>
    </div>
  );
};
const styles = {
  container: {
  }
};

ChartTypeChooser.propTypes = {
};

export default ChartTypeChooser;
