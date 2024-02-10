import React from 'react';
import { UIManager, requireNativeComponent } from 'react-native';

import type { ImageURISource } from 'react-native';
import { Image } from 'react-native';
import { LINKING_ERROR } from '../Constant';
import type { GeoCoordinates } from '../types/Coordinates';

const COMPONENT_NAME = 'MarkerView';

export interface MarkerProps {
  /**
   * ### **(REQUIRED)** Position of the marker on the map
   *
   * **Example:**
   * ```
   * geoCoordinates={{ latitude: 99.00990, longitude: 9.00990, altitude: 1.07 }}
   * ```
   */
  geoCoordinates: GeoCoordinates;

  /**
   * ### **(REQUIRED)** The image of the marker
   *
   * **Example:**
   * ```
   * image={require("../assets/marker_image.png")}
   *
   * image={{ "uri": "https://example.com/marker_image.png" })}
   * ```
   */
  image: ImageURISource;

  /**
   * ### Used to scale the image up (above 1) or down (bellow 1)
   *
   * **Example:**
   * ```
   * scale={1.5}
   * ```
   */
  scale?: number;

  /**
   * ### Manually overwrite the width and height of the image
   *
   * **Example:**
   * ```
   * size={{ width: 40, height: 40 }}
   * ```
   */
  size: { width: number; height: number };

  /**
   * ### Define the anchor point used to define where the image should be placed relative to the coordinates
   *
   * More info on the official [documentation](https://www.here.com/docs/bundle/sdk-for-android-explore-developer-guide/page/topics/map-items.html#anchored-poi-markers)
   *
   * **Example:**
   * ```
   * anchor={{ horizontal: 0.5, vertical: 0.5 }}
   * ```
   */
  anchor?: { horizontal?: number; vertical?: number };
}

const RCTMarker =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<MarkerProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

/**
 * Draws a Marker over the given coordinates
 */
export function Marker(props: MarkerProps) {
  const { geoCoordinates, image, scale, size, anchor } = props;

  return (
    <RCTMarker
      geoCoordinates={geoCoordinates}
      image={Image.resolveAssetSource(image)}
      scale={scale}
      size={size}
      anchor={anchor}
    />
    //   <Image source={image} />
    // </RCTMarker>
  );
}
