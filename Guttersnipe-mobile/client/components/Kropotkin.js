import React, {Component} from 'react';
import {Text, View, Button, Icon} from 'react-native';

export default class Kroptkin extends Component {
  state = {
    paragraph: 'foo'
  };

  fetchKropotkin() {
    fetch('http://192.168.57.1:3000/kropotkins')
      .then(response => response.json())
      .then(data=>this.setState({paragraph: data.paragraph}))
      .catch (e=>this.setState({paragraph: 'nothing'}));
  }
  _onButtonPress(){
    this.fetchKropotkin();
  }
  componentWillMount () {
    this.fetchKropotkin();
  }

  render(){
    return (
      <View>
        <Text>{this.state.paragraph}</Text>
        <Button
          transparent
          title="New Quote"
          onPress={() => this._onButtonPress()}>
        </Button>
      </View>
    )

  }
}