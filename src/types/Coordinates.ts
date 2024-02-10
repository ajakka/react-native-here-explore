export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface GeoCircle {
  center: GeoCoordinates;
  radiusInMeters: number;
}

export interface GeoBox {
  southWestCorner: GeoCoordinates;
  northEastCorner: GeoCoordinates;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface Rectangle2D {
  origin: Point2D;
  size: Size2D;
}

export type GeoPolyline = GeoCoordinates[];
