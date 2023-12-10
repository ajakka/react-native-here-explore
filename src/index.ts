import { NativeModules } from 'react-native';
import { LINKING_ERROR } from './constants';

import { MapsHereView } from './component/MapsHereView';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const MapsHereModule = isTurboModuleEnabled
  ? require('./modules/NativeMapsHereConfig').default
  : NativeModules.MapsHereConfig;

const RCTMapsHere = MapsHereModule
  ? MapsHereModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const MapsHereConfig = {
  initializeHereSDK: function (
    accessKeyID: string,
    accessKeySecret: string
  ): Promise<string> {
    return RCTMapsHere.initializeHereSDK(accessKeyID, accessKeySecret);
  },
};

export { MapsHereConfig, MapsHereView };
