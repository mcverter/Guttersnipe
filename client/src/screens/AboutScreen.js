import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
import FTK from "../components/FTK";
import Utils from './../utils';


const strummerVideoPath = './../../assets/video/Guttersnipe.mp4';
const strummerImagePath = './../../assets/images/JoeStrummerGuttersnipe.png';

const videoIsVisible = false;

class AboutScreen extends Component {
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
                <Text>NO VIDEO</Text>
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
                  onPress={() => this.props.navigation.navigate('KropotkinScreen')}/>
        </View>

        <View style={styles.legalPanel}>
          <View style={styles.legalHeading}>
            <Text>LEGAL NOTICE</Text>
          </View>
          <View style={styles.legalBODY}>
            <Text>Through your usage of Guttersnipe, you agree
              to not put yourself or any other person in legal jeopardy.</Text>
            <Text>You are free to use Guttersnipe as you wish.</Text>
            <Text>
              You are free to use Guttersnipe as you wish.
            </Text>
            <Text>All Wrongs Righted </Text>
            <Text>All Rites Reversed</Text>
          </View>
        </View>

        <View style={styles.contactPanel}>
          <View>
            <Text>Contact</Text>
          </View>
          <TouchableOpacity
            onPress={Utils.openURL("mailto:roadrunner@waste.org")}>
            <Image
              style={{width: '80%', height: 50}}
              source={require('./../assets/images/roadrunnerAtWaste.png')}
            />

            <Text>email: roadrunner [at] waste [dot] org</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  videoPanel: {},
  videoContainer: {},
  video: {},
  aboutScreenContainer: {},
  ftkPanel: {},
  legalPanel: {},
  contactPanel: {}
});

AboutScreen.propTypes = {};

const mapStateToProps = (state) => {
  /*  const {
      data,
    } = state.value;
    return {data}; */
  return {};
};

const mapDispatchToProps = () => {
};

export default connect(mapStateToProps, {/* requestRegistryData */})(AboutScreen)
