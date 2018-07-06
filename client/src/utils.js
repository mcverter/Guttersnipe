import {Linking} from 'react-native';

function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }



export default class Utils {
// Opens a link
  static async openURL(url) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param latLngInDeg array of arrays with latitude and longtitude
   *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
   *   [longtitude2] ...]
   *
   * @return array with the center latitude longtitude pairs in
   *   degrees.
   */
  static findCenterLatLng(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
      var lat = degr2rad(latLngInDegr[i][LATIDX]);
      var lng = degr2rad(latLngInDegr[i][LNGIDX]);
      console.log('finidng center', 'lat', lat, 'lng', lng);
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    console.log('center', 'lat', rad2degr(lat), 'lng', rad2degr(lng));
    return ([rad2degr(lat), rad2degr(lng)]);

  }


  static superDecodeURI(string) {
    if(!string) return string;
    if (string==='') return '';
    return decodeURI(string
      .replace(/%2C/g, ",")
      .replace(/%3A/g, ":")
      .replace(/%23/g, "#")
      .replace(/%3B/g, ";"));
  }
}
