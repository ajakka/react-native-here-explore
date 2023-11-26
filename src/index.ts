import { NativeModules } from 'react-native';
import { LINKING_ERROR } from './constants';

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

const MapsHere = {
  initializeHereSDK: function (
    accessKeyID: string,
    accessKeySecret: string
  ): Promise<string> {
    return RCTMapsHere.initializeHereSDK(accessKeyID, accessKeySecret);
  },
};

export default MapsHere;

export * from './component/MapsHereView';
