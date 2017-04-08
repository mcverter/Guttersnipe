import {STORE_BROWSER_LOCATION} from './browserEnvActionTypes';

function getBrowserLocationAsPromise() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);},
      function(error) {alert("Could not determine your position automatically.  Please press the button beneath the zoom controls to locate yourself.");});
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

