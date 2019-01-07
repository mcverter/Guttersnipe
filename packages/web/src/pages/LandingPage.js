import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import FTK from "../components/FTK";
import RaisedButton from "material-ui/RaisedButton";
import {
  fetchAllShareablesRequestAction,
  fetchCategoriesRequestAction,
} from 'guttersnipe-shared/redux/actions/shareables';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.fetchInitialData = this.fetchInitialData.bind(this);
  }

  fetchInitialData() {
    this.props.fetchAllShareablesRequestAction();
    this.props.fetchCategoriesRequestAction();
  }


  render() {
    return (
      <div style={styles.landingPageContainer}>
        <div style={styles.searchShareablesButtonContainer}>
          <div>
            <RaisedButton
              onClick={this.fetchInitialData}
            ><Link to="/category">Search Shareables</Link></RaisedButton>
          </div>
          <div>
            <RaisedButton><Link to="/add"> Add Shareables</Link></RaisedButton>
          </div>
        </div>

        <RaisedButton><Link to="/about">
          <FTK style={styles.shareablesFTKText} />
        </Link></RaisedButton>
      </div>
    );
  }

}
const styles = {
  landingPageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#910f0f",
    height: "100%"
  },

  shareablesFTKText: {
    color: "red",
    textAlign: "center",
    fontFamily: "courier",
    fontWeight: "900"
  },
  searchShareablesButtonContainer: {
    padding: 25
    //    marginBottom: 50
  },
  shareablesFTKContainer: {
    backgroundColor: "black",
    padding: 75
  },
  createShareablesButton: {}
};

LandingPage.propTypes = {};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {fetchAllShareablesRequestAction, fetchCategoriesRequestAction}
)(LandingPage);

  /*{user && (user.role === 'admin' || user.role === 'superadmin') &&
          <div style={styles.createShareablesButton}>
            <Button
              title="CreateShareable"
              color={styles.createShareablesButton.color}
              accessibilityLabel="Click here to create a shareable"
            />
          </div>
          }

                    <div>
            <RaisedButton><Link to="/location">Set Location</Link></RaisedButton>
          </div>


          */
