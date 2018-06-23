import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

class $componentName$ extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        $END$
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

const styles = new StyleSheet({

});

$componentName$.propTypes = {
  $END$
};

const mapStateToProps = (state) => {
  /*  const {
      data,
    } = state.value;
    return {data}; */
  return {};
};

@connect(mapStateToProps, {
  /* requestRegistryData, */
})($componentName$)

export default $componentName$;
