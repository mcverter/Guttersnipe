import {STORE_BROWSER_LOCATION} from './browserEnvActionTypes';

function getBrowserLocationAsPromise() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);},
      function(error) {alert("Could not find your current position");},
      {timeout:500}
    );
  });
}

export function setBrowserLocation() {
  return function(dispatch) {
    getBrowserLocationAsPromise()
      .then(coords=>{
        dispatch({type: STORE_BROWSER_LOCATION, location: coords});
      });
  };
}

