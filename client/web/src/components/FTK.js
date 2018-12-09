import React from "react";
import PropTypes from "prop-types";

const FTK = () => {
  return (
    <div style={styles.ftkContainer}>
      *********
      {"\n"}
      !! FOR !!
      {"\n"}
      !! THE !!
      {"\n"}
      !! KIDS !!
      {"\n"}
      *********
    </div>
  );
};
const styles = {
  ftkText: {
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 10
  },
  ftkContainer: {
    display: "flex",
    alignItems: "center",
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    margin: 2
  }
};

FTK.propTypes = {
  style: PropTypes.object
};

export default FTK;
