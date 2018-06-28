import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Video from 'react-native-video';
import strummerVid from './../../assets/video/Guttersnipe.mp4';
import FTK from "../components/FTK";
import strummerImage from './../../assets/images/JoeStrummerGuttersnipe.png';
import roadrunnerImage from './../../assets/images/roadrunnerAtWaste.JPG';


class AboutScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.aboutScreenContainer}>
        <View style={styles.videoPanel}>
          <View style={styles.videoContainer}>
            <Video source={{guttervid: strummerVid} }
                   ref={(ref) => {this.player = ref}}
                   style={styles.video} />
          </View>
        </View>
        <View style={styles.ftkPanel}>
          <FTK/>
        </View>
        <View aboutScreenContainer>
          <Button onClick={goToKropotkinScreen}> Read Kropotkin </Button>
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
            <Text>
              All Wrongs Righted <br />
              All Rites Reversed
            </Text>
          </View> {/* end legal body */}
        </View> {/* end legal panel */}

        <View style={styles.contactPanel}>
          <View>
            Contact
          </View>
          <View>
            <Image source={roadrunnerImage} />
            <Text>email: roadrunner [at] waste [dot] org</Text>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  videoPanel : {},
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

const mapDispatchToProps = () => {}

export default connect(mapStateToProps, { /* requestRegistryData */ })(AboutScreen)
