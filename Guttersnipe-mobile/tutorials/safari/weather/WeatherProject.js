import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image
} from 'react-native';
import Forecast from "./Forecast";
import OpenWeatherMap from "./open_weather_map";

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {zip:"", forecast: null};
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip)
      .then(forecast => {
        console.log(forecast);
        this.setState({forecast})
      })
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast {...this.state.forecast} />
      )
    }
    return (
      <View style={styles.container}>
        <Image
          source={require("./flowers.png")}
          resizeMode="cover"
          style={styles.backdrop}
        />

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
            {content}
          </View>
      </View>
    )
  }
}


const baseFontSize = 16;

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
    paddingTop: 5,
    backgroundColor: "#000",
    opacity: 0.5
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    flex: 1,
    flexBasis: 1,
    width: 50,
    height: baseFontSize
  },
  mainText: {
    fontSize: baseFontSize,
    color: "#FFF"
  }
});
