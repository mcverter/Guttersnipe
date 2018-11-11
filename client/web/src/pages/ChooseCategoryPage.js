import React, { Component } from "react";

import GsButton from "../components/GsButton";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class ChooseCategoryPage extends Component {
  static navigationOptions = {
    title: "Choose Category"
  };
  constructor(props) {
    super(props);
  }

  render() {
    const categorization = this.props.categorization;

    return (
      <div style={styles.chooseCategoryPageContainer}>
        <div>
          <div>Choose a Category</div>
        </div>
        {Object.keys(categorization).map(c => (
          <GsButton
            styleContainer={{
              backgroundColor: "red",
              padding: 20,
              margin: 25,
              width: "80%"
            }}
            styleText={{
              color: "black",
              fontWeight: "900",
              textAlign: "center"
            }}
            key={c}
            title={c}
            onPress={() => {
              this.props.navigation.navigate("ChooseSubcategoryPage", {
                category: c
              });
            }}
          >
            {c}
          </GsButton>
        ))}
      </div>
    );
  }
}
const styles = StyleSheet.create({
  chooseCategoryButton: {},
  chooseCategoryPageContainer: {
    backgroundColor: "black",
    height: "100%"
  }
});

ChooseCategoryPage.propTypes = {};

const mapDispatchToProps = {};
const mapStateToProps = state => state.categorization;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseCategoryPage);
