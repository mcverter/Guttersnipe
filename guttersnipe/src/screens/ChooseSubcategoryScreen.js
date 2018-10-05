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
import GsButton from "../components/GsButton";

class ChooseSubcategoryScreen extends Component {
  static navigationOptions = {
    title: 'Choose Subcategory',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;
    const category = navigation.getParam('category', '');
    debugger
    const subcategories = this.props.categorization[category];

    return (
      <View style={styles.chooseSubcategoryScreenContainer}>
        <View>
          <PageTitle>Choose a Category</PageTitle>
        </View>
        {subcategories.map(s =>
          <GsButton
            styleContainer={{backgroundColor: "black", padding: 20, margin: 25, width: "80%"}}
            styleText={{color: 'red', fontWeight: '900', textAlign: "center"}}
            key={s}
            title={s}
            onPress={()=>{
              this.props.navigation.navigate('ShareableListScreen', {
                subcategory: s
              });
            }}
          >{s}
          </GsButton>)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  chooseSubcategoryScreenContainer: {
    backgroundColor: 'red',
    height: '100%'
  },
  chooseSubcategoryButton : {}
});

ChooseSubcategoryScreen.propTypes = {};

const mapDispatchToProps = {};
const mapStateToProps = state => state.categorization;

export default
connect(mapStateToProps, mapDispatchToProps)
(ChooseSubcategoryScreen);
