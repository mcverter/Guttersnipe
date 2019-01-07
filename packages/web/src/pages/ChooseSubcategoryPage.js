import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

class ChooseSubcategoryPage extends Component {
  render() {
    let category = this.props.match.params["category"];
    const subcategories = this.props.categorization[category];

    return (
      <div style={styles.chooseSubcategoryPageContainer}>
        {subcategories.map(s => (
          <div>
            <div style={{
              backgroundColor: "black",
              padding: 20,
              margin: 25,
              width: "80%",
              color: "red",
              fontWeight: "900",
              textAlign: "center"
            }}>
              <Link to={`shareables/${s}`}>{s}</Link>
            </div>
          </div>

        ))}
      </div>
    );
  }
}
const styles = {
  chooseSubcategoryPageContainer: {
    backgroundColor: "red",
    height: "100%"
  },
  chooseSubcategoryButton: {}
};

ChooseSubcategoryPage.propTypes = {};

const mapDispatchToProps = {};
const mapStateToProps = state => state.categorization;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseSubcategoryPage);
