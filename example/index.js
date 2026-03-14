import App from './src/App';
import { name as appName } from './app.json';

import { AppRegistry } from 'react-native';

import { HEREConfig } from 'react-native-here-explore';

import { YOUR_ACCESS_KEY_ID, YOUR_ACCESS_KEY_SECRET } from '@env';

const result = HEREConfig.initializeHereSDK(
  YOUR_ACCESS_KEY_ID || 'YOUR_ACCESS_KEY_ID',
  YOUR_ACCESS_KEY_SECRET || 'YOUR_ACCESS_KEY_SECRET'
);

console.log('Initializing HERE SDK ' + result);

AppRegistry.registerComponent(appName, () => App);
