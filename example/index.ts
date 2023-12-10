import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import { MapsHereConfig } from 'react-native-maps-here';

MapsHereConfig.initializeHereSDK('', '');

AppRegistry.registerComponent(appName, () => App);
