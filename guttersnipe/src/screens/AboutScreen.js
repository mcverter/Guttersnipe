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
import LegalNotice from '../components/LegalNotice';
import ContactPanel from '../components/ContactPanel';



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
            <Video
              source={require('../assets/video/Guttersnipe.mp4')}
              rate={1.0}
              volume={1.0}
              muted={false}
              resizeMode="cover"
              style={{ width: '100%', height: 200 }}
              poster={'../assets/images/JoeStrummerGuttersnipe.png'}
            />
          </View>
        </View>

        <View style={styles.ftkPanel}>
          <FTK/>
        </View>

        <View style={styles.kropotkin}>
          <Button title="Read Kropotkin"
                  style={styles.readKropotkinButton}
                  color={"black"}
                  onPress={() => this.props.navigation.navigate('KropotkinScreen')}/>
        </View>

        <LegalNotice/>
       <ContactPanel/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  aboutScreenContainer: {},

  videoPanel: {},
  videoContainer: {},
  video: {
    height: 200,
    width: '100%'
  },

  ftkPanel: {},

  legalPanel: {
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
