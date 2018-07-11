import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
import FTK from "../components/FTK";
import Utils from './../utils';
import GsText from '../components/GsText';


const strummerVideoPath = './../../assets/video/Guttersnipe.mp4';
const strummerImagePath = './../../assets/images/JoeStrummerGuttersnipe.png';

const videoIsVisible = false;

class AboutScreen extends Component {
  static navigationOptions = {
    title: 'About Guttersnipe',
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.aboutScreenContainer}>
        <View style={styles.videoPanel}>
          <View style={styles.videoContainer}>
            {videoIsVisible ?
              <Video source={{uri: strummerVideoPath}} ref={(ref) => {
                this.player = ref
              }} style={styles.video}/> :
              <View>
                <GsText>NO VIDEO</GsText>
                <Image
                  style={{width: '100%', height: 200}}
                  source={require('./../assets/images/JoeStrummerGuttersnipe.png')}
                />

              </View>
            }
          </View>
        </View>

        <View style={styles.ftkPanel}>
          <FTK/>
        </View>

        <View style={styles.kropotkin}>
          <Button title="Read Kropotkin"
                  style={styles.readKropotkinButton}
                  onPress={() => this.props.navigation.navigate('KropotkinScreen')}/>
        </View>

        <View style={styles.legalPanel}>
          <View style={styles.legalHeading}>
            <GsText>LEGAL NOTICE</GsText>
          </View>
          <View style={styles.legalBody}>
            <View style={styles.noJeopardy}>
            <GsText>Through your usage of Guttersnipe, you agree
              to not put yourself or any other person in legal jeopardy.</GsText>
            </View>
            <View style={styles.freeToUse}>
              <GsText>You are free to use Guttersnipe as you wish.</GsText>
            </View>
            <View style={styles.rightsRites}>
              <GsText>All Wrongs Righted </GsText>
              <GsText>All Rites Reversed</GsText>
            </View>
          </View>
        </View>

        <View style={styles.contactPanel}>
          <View>
            <GsText>Contact</GsText>
          </View>
          <TouchableOpacity
            onPress={()=>Utils.openURL("mailto:roadrunner@waste.org")}>
            <Image
              style={{width: '80%', height: 50}}
              source={require('./../assets/images/roadrunnerAtWaste.png')}
            />
            <GsText>email: roadrunner [at] waste [dot] org</GsText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  aboutScreenContainer: {},

  videoPanel: {},
  videoContainer: {},
  video: {},

  ftkPanel: {},

  legalPanel: {
    borderColor: 'black',
    borderWidth: 1
  },

  legalHeading: {
  },
  legalBody: {},
  noJeopardy: {
    borderColor: 'black',
    borderWidth: 1
  },
  freeToUse: {
    borderColor: 'black',
    borderWidth: 1
  },
  rightsRites: {
    borderColor: 'black',
    borderWidth: 1
  },

  readKropotkinButton: {
    color: 'orange'
  },

  contactPanel: {},
});

AboutScreen.propTypes = {};
/*
const mapStateToProps = (state) => {
  /*  const {
      data,
    } = state.value;
    return {data};
  return {};
};

const mapDispatchToProps = () => {
};
*/
export default /*connect(mapStateToProps, { requestRegistryData })*/(AboutScreen)
