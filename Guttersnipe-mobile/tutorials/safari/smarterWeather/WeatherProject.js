import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';
import Forecast from "./Forecast";
import LocationButton from './LocationButton';
import textStyles from './styles/typography.js'
import PhotoBackdrop from "./PhotoBackdrop/local_image";

const STORAGE_KEY = "@SmarterWeather:zip";

import OpenWeatherMap from "./open_weather_map";



class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = { forecast: null};
  }

  componentDidMount() {
    AsyncStorage
      .getItem(STORAGE_KEY)
      .then(value=>{
        if (value) {
          this._getForecastForZip(value)
        }
      })
      .catch(error=>console.error("Async storage error: " + error.message));
  }


  _getForecastForZip = zip => {
    AsyncStorage
      .setItem(STORAGE_KEY, zip)
      .then(()=> console.log("saved selection to disk" + zip))
      .catch(error=>console.error("Async Storage Error" + error.message))
      .done();

    OpenWeatherMap.fetchZipForecast(zip)
      .then(forecast => {
        this.setState({forecast: forecast})
      })
  }

  _getForecastForCoords = ({lat, lon}) => {
    OpenWeatherMap.fetchLatLonForecast(lat, lon)
      .then(forecast => {
        this.setState({forecast: forecast})
      })
  };



  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      const {main, temp} = this.state.forecast
      content = (
        <View style={styles.row}>
          <Forecast
            main={main}
            temp={temp}
          />

        </View>
      )
    }


    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
            </Text>

            <View style={styles.zipContainer}>
              <TextInput
                style={styles.zipCode, styles.mainText}
                onSubmitEditing={this._handleTextChange}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View>
            <LocationButton onGetCoords={this._getForecastForCoord}/>
          </View>
          {content}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30
  },

  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },

  zipContainer: {
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    height: textStyles.baseFontSize * 2,
    width: 80,
    justifyContent: "flex-end"
  },
  zipCode: {
    flex: 1
  }
});

export default WeatherProject;
