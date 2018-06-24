import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

class AboutScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

const styles = StyleSheet.create({

});

AboutScreen.propTypes = {

};

const mapStateToProps = (state) => {
  /*  const {
      data,
    } = state.value;
    return {data}; */
  return {};
};

export default connect(mapStateToProps, { /* requestRegistryData */ })(AboutScreen)
