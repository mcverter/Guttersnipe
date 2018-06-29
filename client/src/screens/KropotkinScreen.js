import React, {Component} from 'react';
import {Text, View, Button, Icon} from 'react-native';
import {connect} from 'react-redux'
import {fetchRandomKropotkin} from './../../redux/actions/kropotkin'

console.log(fetchRandomKropotkin);

const defaultParagraph = `
        If it be so, can we doubt that work
         will become a pleasure 
        and a relaxation in a society of equals, 
        in which "hands" will not be compelled 
        to sell themselves to toil, 
        and to accept work under any conditions? 
        Repugnant tasks will disappear, 
        because it is evident 
        that these unhealthy conditions 
        are harmful to society as a whole.
         Slaves can submit to them, 
        but free men will create new conditions, 
        and their work will be pleasant 
        and infinitely more productive. 
        The exceptions of to-day will be 
        the rule of to-morrow.
`;


class Kroptkin extends Component {
  constructor(props) {
    super(props);
  }

  _onButtonPress(){
    this.props.fetchK();
  }
  componentWillMount () {
    this.props.fetchK();
  }

  render(){
    const paragraph = this.props.paragraph || defaultParagraph;
    return (
      <View>
        <Text>{paragraph}</Text>
        <Button
          transparent
          title="New Quote"
          onPress={() => this._onButtonPress()}>
        </Button>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch){
  return {
    fetchK: () => {
      dispatch(fetchRandomKropotkin());
    }
  };
};

function mapStateToProps(state) {
  return {
    paragraph: state.kropotkin.paragraph,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Kroptkin);



/*  fetchRandomKropotkin() {
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
