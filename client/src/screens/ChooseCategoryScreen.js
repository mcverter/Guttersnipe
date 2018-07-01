import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import PageTitle from '../components/PageTitle';

import PropTypes from 'prop-types';

class ChooseCategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const categorization = this.props.categorization;

    return (
      <View>
        <View>
          <PageTitle>Choose a Category</PageTitle>
        </View>
        {Object.keys(categorization).map(c =>
          <Button
            key={c}
            title={c}
            onPress={()=>{
              this.props.navigation.navigate('ChooseSubcategoryScreen', {
                category: c
              });
            }}
          >{c}
          </Button>)}
      </View>
    );
  }
}
const styles = StyleSheet.create({

});

ChooseCategoryScreen.propTypes = {

};

function mapDispatchToProps(dispatch){
  return {};
}

function mapStateToProps(state) {
  return {
    categorization: state.categorization.categorization,
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (ChooseCategoryScreen);
