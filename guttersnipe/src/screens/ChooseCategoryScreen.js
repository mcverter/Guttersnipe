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
import GsButton from "../components/GsButton";

class ChooseCategoryScreen extends Component {
  static navigationOptions = {
    title: 'Choose Category',
  };
  constructor(props) {
    super(props);
  }

  render() {
//    const {categorization} = this.props;

    return (
      <View style={styles.chooseCategoryScreenContainer}>
        <View>
          <PageTitle>Choose a Category</PageTitle>
        </View>
        {Object.keys(categorization).map(c =>
          <GsButton
            styleContainer={{backgroundColor: "red", padding: 20, margin: 25, width: "80%"}}
            styleText={{color: 'black', fontWeight: '900', textAlign: "center"}}
            key={c}
            title={c}
            onPress={()=>{
              this.props.navigation.navigate('ChooseSubcategoryScreen', {
                category: c
              });
            }}
          >{c}
          </GsButton>)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  chooseCategoryButton : {},
  chooseCategoryScreenContainer: {
    backgroundColor: 'black',
    height: '100%'
  }
});

ChooseCategoryScreen.propTypes = {

};


export default ChooseCategoryScreen;
