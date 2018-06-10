import React, {Component} from 'react';
import {Text, View, Button, Icon} from 'react-native';
import {connect} from 'react-redux'
import {fetchKropotkin} from './../actions/kropotkins/kropotkinActions'
console.log(fetchKropotkin);
const foo = function(){console.log('foo')};
class Kroptkin extends Component {
  /*  fetchKropotkin() {
    fetch('http://192.168.56.1:3000/kropotkins')
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(data=>{
        console.log(data);
        return this.setState({paragraph: data.paragraph})
      })
      .catch (e=>this.setState({paragraph: 'nothing'}));
  }
  */
  _onButtonPress(){
    this.props.fetchK();
  }
  componentWillMount () {
    this.props.fetchK();
  }

  render(){
    return (
      <View>
        <Text>{this.props.paragraph}</Text>
        <Button
          transparent
          title="New Quote"
          onPress={() => this._onButtonPress()}>
        </Button>
      </View>
    )

  }
}


function mapDispatchToProps(dispatch){
  return {
    fetchK: () => {
      dispatch(fetchKropotkin());
    }
  };
};

function mapStateToProps(state) {
  return {
    paragraph: state.kropotkin.paragraph,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Kroptkin);


