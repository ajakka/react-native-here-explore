import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { YOUR_ACCESS_KEY_ID, YOUR_ACCESS_KEY_SECRET } from '@env';
import { MapsHereConfig } from 'react-native-maps-here';

MapsHereConfig.initializeHereSDK(
  YOUR_ACCESS_KEY_ID || 'YOUR_ACCESS_KEY_ID',
  YOUR_ACCESS_KEY_SECRET || 'YOUR_ACCESS_KEY_SECRET'
);

AppRegistry.registerComponent(appName, () => App);
