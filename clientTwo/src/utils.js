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
}
