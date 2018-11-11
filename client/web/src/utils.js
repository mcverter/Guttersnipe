function rad2degr(rad) {
  return (rad * 180) / Math.PI;
}
function degr2rad(degr) {
  return (degr * Math.PI) / 180;
}

// Opens a link
export async function utilOpenURL(url) {
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
export function findCenterLatLng(latLngInDegr) {
  const LATIDX = 0;
  const LNGIDX = 1;
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  let lat, lng;

  for (let i = 0; i < latLngInDegr.length; i++) {
    lat = degr2rad(latLngInDegr[i][LATIDX]);
    lng = degr2rad(latLngInDegr[i][LNGIDX]);
    // sum of cartesian coordinates
    sumX += Math.cos(lat) * Math.cos(lng);
    sumY += Math.cos(lat) * Math.sin(lng);
    sumZ += Math.sin(lat);
  }

  const avgX = sumX / latLngInDegr.length;
  const avgY = sumY / latLngInDegr.length;
  const avgZ = sumZ / latLngInDegr.length;

  // convert average x, y, z coordinate to latitude and longtitude
  lng = Math.atan2(avgY, avgX);
  const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  lat = Math.atan2(avgZ, hyp);

  return [rad2degr(lat), rad2degr(lng)];
}
