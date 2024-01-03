import { NativeModules } from 'react-native';
import { LINKING_ERROR } from '../Constants';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const MapsHereModule = isTurboModuleEnabled
  ? require('./NativeMapsHereConfig').default
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

export const MapsHereConfig = {
  initializeHereSDK: function (
    accessKeyID: string,
    accessKeySecret: string
  ): string {
    return RCTMapsHere.initializeHereSDK(accessKeyID, accessKeySecret);
  },
};
