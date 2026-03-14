import App from './src/App';
import { name as appName } from './app.json';

import { AppRegistry } from 'react-native';

import { HEREConfig } from 'react-native-here-explore';
import Config from 'react-native-config';

const result = HEREConfig.initializeHereSDK(
  Config.YOUR_ACCESS_KEY_ID || 'YOUR_ACCESS_KEY_ID',
  Config.YOUR_ACCESS_KEY_SECRET || 'YOUR_ACCESS_KEY_SECRET'
);

console.log('Initializing HERE SDK ' + result);

AppRegistry.registerComponent(appName, () => App);
