import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initializeHereSDK(accessKeyID: string, accessKeySecret: string): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MapsHereConfig');
