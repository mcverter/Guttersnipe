import React, {Component} from 'react';
import {connect} from 'react-redux';
import defaultState from '../../redux/store/initialState';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

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
    console.log('categorizations props', this.props);
    return (
      <View style={styles.chooseCategoryScreenContainer}>
        <View>
          <Text>Choose a Category</Text>
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

const mapDispatchToProps = {};
const mapStateToProps = state => state.shareables;
export default
 connect(mapStateToProps, mapDispatchToProps)
(ChooseCategoryScreen);

