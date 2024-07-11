import { NativeModules } from 'react-native';
import { LINKING_ERROR } from '../Constant';

const NAME = 'MapsHereConfig';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const MapsHereModule = isTurboModuleEnabled
  ? require('./NativeMapsHereConfig').default
  : NativeModules[NAME];

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

/**
 * Config class used to initialyze the Here SDK before use.
 */
export const MapsHereConfig = {
  /**
   * Method used to initialize HERE SDK using the KEY_ID and KEY_SECRET
   * Retrived from your [admin portal](https://platform.here.com/admin/apps)
   *
   * @param accessKeyID Your app's Key ID
   * @param accessKeySecret Your app's Key Secret
   */
  initializeHereSDK: function (
    accessKeyID: string,
    accessKeySecret: string
  ): string {
    return RCTMapsHere.initializeHereSDK(accessKeyID, accessKeySecret);
  },
};
