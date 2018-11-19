import React from "react";

import GsText from "./GsText";

import PropTypes from "prop-types";

const Shareable = ({ shareable, navigation }) => {
  const {
    id,
    subcategory,
    category,
    name,
    description,
    address,
    time,
    geolocation,
    icalendar
  } = shareable;

  return (
    <div style={styles.shareableContainer}>
      <div style={styles.shareableTitleContainer}>
        <div style={{ flexGrow: 5 }}>
          <GsText style={styles.shareableName}>{name}</GsText>
        </div>
        <div style={{ flexGrow: 2, display: "flex", flexDirection: "row" }}>
          <div>
            <span style={styles.category}>{category + "   "}</span>
          </div>
          <div>
            <span style={styles.subcategory}>{"(" + subcategory + ")"}</span>
          </div>
        </div>
      </div>
      {!!description && (
        <div>
          <GsText style={styles.description}>{description}</GsText>
        </div>
      )}
      <div>
        <GsText style={styles.address}>{address}</GsText>
      </div>
      {!!time && (
        <div>
          <GsText style={styles.time}>{time}</GsText>
        </div>
      )}
      {!!icalendar && (
        <div>
          <GsText>div Calendar</GsText>
        </div>
      )}
    </div>
  );
};
const styles = {
  shareableContainer: {
    borderWidth: 2,
    margin: 2,
    padding: 2,
    borderColor: "#000",
    borderStyle: "solid"
  },
  shareableName: {
    fontWeight: "700"
  },
  category: {
    color: "#b24040"
  },
  subcategory: {
    color: "#e8a2a2"
  },
  description: {
    color: "#000",
    fontWeight: "800"
  },
  address: {
    fontStyle: "italic",
    color: "#4F0010",
    fontWeight: "500"
  },
  time: {
    fontStyle: "italic",
    color: "#9B4D8A",
    fontWeight: "500"
  },
  divMapButton: {
    color: "purple"
  },
  shareableTitleContainer: {
    display: "flex",
    flexDirection: "row"
  }
};

Shareable.propTypes = {};

export default Shareable;
