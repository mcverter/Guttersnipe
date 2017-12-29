const WEATHER_API_KEY = "bbeb34ebf60ad50f7893e7440a1e2b0b";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";
function zipUrl(zip) {
  return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(zip) {
  return fetch(zipUrl(zip))
    .then(response=>response.json())
    .then(responseJSON=>{
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp
      };
    })
    .catch(error=>{
      console.error(error);
    })
}

function _getForecast(url, cb) {
  fetch(url)
    .then(response => response.json())
    .then(responseJSON=> {
      console.log(responseJSON)
      this.setState({
        forecast: {
          main: responseJSON.weather[0].main,
          description: responseJSON.weather[0].description,
          temp: responseJSON.main.temp
        }
    });
    })
    .catch(error=>{
        console.error(error);
      })
    })
}
export const _getForecastForZip = zip => {
  _getForecast(
    `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`);
};

export const _getForecastForCoords = zip => {
  _getForecast(
    `${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`);
};




export default {fetchForecast: fetchForecast}
