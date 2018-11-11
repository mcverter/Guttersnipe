import React, { Component } from "react";

import GsButton from "../components/GsButton";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class ChooseSubcategoryPage extends Component {
  static navigationOptions = {
    title: "Choose Subcategory"
  };

  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;
    const category = navigation.getParam("category", "");
    const subcategories = this.props.categorization[category];

    return (
      <div style={styles.chooseSubcategoryPageContainer}>
        {subcategories.map(s => (
          <GsButton
            styleContainer={{
              backgroundColor: "black",
              padding: 20,
              margin: 25,
              width: "80%"
            }}
            styleText={{ color: "red", fontWeight: "900", textAlign: "center" }}
            key={s}
            title={s}
            onPress={() => {
              this.props.navigation.navigate("ShareablesPage", {
                subcategory: s
              });
            }}
          >
            {s}
          </GsButton>
        ))}
      </div>
    );
  }
}
const styles = StyleSheet.create({
  chooseSubcategoryPageContainer: {
    backgroundColor: "red",
    height: "100%"
  },
  chooseSubcategoryButton: {}
});

ChooseSubcategoryPage.propTypes = {};

const mapDispatchToProps = {};
const mapStateToProps = state => state.categorization;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseSubcategoryPage);
