import NativeHEREConfig from './specs/NativeHEREConfig';

/**
 * Config class used to initialize the HERE SDK before use.
 */
export const HEREConfig = {
  /**
   * Method used to initialize HERE SDK using the KEY_ID and KEY_SECRET
   * Retrieved from your [admin portal](https://platform.here.com/admin/apps)
   *
   * @param accessKeyID Your app's Key ID
   * @param accessKeySecret Your app's Key Secret
   */
  initializeHereSDK: function (
    accessKeyID: string,
    accessKeySecret: string
  ): string {
    return NativeHEREConfig.initializeHereSDK(accessKeyID, accessKeySecret);
  },
};
