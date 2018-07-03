import React, {Component} from 'react';
import {connect} from 'react-redux';
import defaultState from '../../redux/store/initialState';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';
import PageTitle from '../components/PageTitle';

 import  categorization  from '../../redux/store/categorizations';


class ChooseCategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
//    const {categorization} = this.props;

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

/*
function mapDispatchToProps(dispatch){
  return {};
}

function mapStateToProps(defaultState=defaultState) {
  debugger;
  console.log('in choose category map state to props');
 //  TODO  Why does the default key word appear?
  const state = defaultState.state;
  return {
    categorization: state.categorization.categorization,
  };
  */

export default ChooseCategoryScreen;
