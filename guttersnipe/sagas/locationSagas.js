function* getCurrentLocation() {
  let coordinates = yield navigator.geolocation.getCurrentPosition();
  yield put({ type: "BROWSER_LOCATION", coordinates });
}

/**
 import {STORE_BROWSER_LOCATION} from './browserEnvActionTypes';

 function getBrowserLocationAsPromise() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
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

*/
