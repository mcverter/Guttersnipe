import { STORE_BROWSER_LOCATION } from "../types";

function getBrowserLocationAsPromise() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(function(position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  });
}

export function setBrowserLocation() {
  return function(dispatch) {
    getBrowserLocationAsPromise().then(coords => {
      dispatch({ type: STORE_BROWSER_LOCATION, location: coords });
    });
  };
}
