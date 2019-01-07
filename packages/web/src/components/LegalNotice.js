import React from "react";

import GsText from "./GsText";

import PropTypes from "prop-types";

const LegalNotice = () => {
  return (
    <div style={styles.legalPanel}>
      <div>
        <GsText style={styles.legalHeading}>LEGAL NOTICE</GsText>
      </div>
      <div style={styles.legalBody}>
        <div>
          <div style={styles.noJeopardy}>
            Through your usage of Guttersnipe, you agree to not put yourself or
            any other person in legal jeopardy.
          </div>
        </div>
        <div>
          <GsText style={styles.freeToUse}>
            You are free to use Guttersnipe as you wish.
          </GsText>
        </div>
        <div>
          <div style={styles.rightsRites}>All Wrongs Righted </div>
          <div style={styles.rightsRites}>All Rites Reversed</div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  legalPanel: {
    borderColor: "black",
    borderWidth: 1,
    display: "flex"
  },

  legalHeading: {
    fontWeight: "700"
  },
  legalBody: {},
  noJeopardy: {
    color: "#800000",
    textAlign: "center"
  },
  freeToUse: {
    color: "red",
    textAlign: "center"
  },
  rightsRites: {
    textAlign: "center",
    color: "#ff9933"
  }
};

LegalNotice.propTypes = {};

export default LegalNotice;
