import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import { MapsHereConfig } from 'react-native-maps-here';

MapsHereConfig.initializeHereSDK(
  'YOUR_ACCESS_KEY_ID',
  'YOUR_ACCESS_KEY_SECRET'
);

AppRegistry.registerComponent(appName, () => App);
