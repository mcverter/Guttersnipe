import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Shareable from '../components/Shareable';

class ShareableListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.shareables.map(s=>(
          <Shareable shareable={...s} />
        ))}
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

ShareableListItem.propTypes = {
};

const mapStateToProps = (state) => {
  /*  const {
      data,
    } = state.value;
    return {data}; */
  return {};
};

connect(mapStateToProps, {
  /* requestRegistryData, */
})(ShareableListItem)

export default connect(mapStateToProps, {
  /* requestRegistryData, */
})(ShareableListItem);
