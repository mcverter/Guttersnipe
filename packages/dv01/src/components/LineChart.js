import React from "react";
import PropTypes from "prop-types";

const createCorrespondence = (xData, yData) => {
  if (!xData || !yData) {
    return false;
  }
  const length = xData.length;

  let correspondence = {};
  for (let i = 0; i< length; i++) {
    let x = xData[i];
    let y = yData[i];
    if (!x || !y) {
      return false;
    }
    correspondence[x] = y;
  }
  return correspondence;
};

const LineChart = ({xData, yData, xName, yName}) => {
  console.log('xdata', xData);
  console.log('ydata', yData);

  let correspondence = createCorrespondence(xData, yData);

  if (! correspondence) {
    return (
      <div> Not enough information in columns.  Can not create chart</div>
    )
  }
  return (
    <div style={styles.container}>
      <div> Comparing {xName} with {yName} in a Line Chart</div>
      <div>
        <div style={styles.container}> X Data  {xData} </div>
        <div style={styles.container}> Y Data  {yData} </div>
      </div>
      <div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid"
  }
};

LineChart.propTypes = {
};

export default LineChart;
