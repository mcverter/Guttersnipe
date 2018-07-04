import {Linking} from 'react-native';

export default class Utils {
// Opens a link
  static async openURL(url) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }
  static superDecodeURI(string) {
    if(!string) return string;
    return decodeURI(string
      .replace(/%2C/g, ",")
      .replace(/%3A/g, ":")
      .replace(/%23/g, "#")
      .replace(/%3B/g, ";"));
  }
}
