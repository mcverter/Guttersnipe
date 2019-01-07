import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategorizationState } from 'guttersnipe-shared/redux/selectors/shareables';
;

class ChooseCategoryPage extends Component {
  render() {
    const categorization = this.props.categorization;

    return (
      <div style={styles.chooseCategoryPageContainer}>
        <div>
          <div>Choose a Category</div>
        </div>
        {/*Object.keys(categorization).map(c => (
          <div>
            <div>
              <div style={{
                backgroundColor: "red",
                padding: 20,
                margin: 25,
                width: "80%",
                color: "black",
                fontWeight: "900",
                textAlign: "center"
              }}>
                <Link to={`subcategory/${c}`}>{c}</Link>
              </div>
            </div>
          </div>
        ))*/}
      </div>
    );
  }
}
const styles = {
  chooseCategoryButton: {},
  chooseCategoryPageContainer: {
    backgroundColor: "black",
    height: "100%"
  }
};

ChooseCategoryPage.propTypes = {
  categorizations: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    categorizations: getCategorizationState(state)
  }
};

export default connect(mapStateToProps)(ChooseCategoryPage);
