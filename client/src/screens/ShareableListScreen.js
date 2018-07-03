import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet
} from 'react-native';
import Shareable from '../components/Shareable';

class ShareableListScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.shareables.map(s=>(
          <Shareable shareable={s} key={s.id} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

ShareableListScreen.propTypes = {
};

function mapDispatchToProps(dispatch){
  return {};
}

function mapStateToProps(state) {
  return {
    shareables: state.shareables.shareables,
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (ShareableListScreen);
