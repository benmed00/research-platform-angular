export interface MapLayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  data: GeoJSON.FeatureCollection;
  style?: LayerStyle;
  metadata?: Record<string, unknown>;
}

export enum LayerType {
  HABITAT = 'HABITAT',
  SPECIES = 'SPECIES',
  WEATHER_STATION = 'WEATHER_STATION',
  WATER_POINT = 'WATER_POINT',
  GEOLOGY = 'GEOLOGY',
  MISSION = 'MISSION',
  CUSTOM = 'CUSTOM'
}

export interface LayerStyle {
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  icon?: string;
  iconSize?: [number, number];
}

export interface MapView {
  center: Coordinates;
  zoom: number;
  bounds?: BoundingBox;
  layers: string[]; // Layer IDs
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface SpatialQuery {
  geometry: Geometry;
  layers?: string[];
  buffer?: number; // in meters
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[] | number[][] | number[][][];
}

export enum GeometryType {
  POINT = 'Point',
  LINESTRING = 'LineString',
  POLYGON = 'Polygon',
  MULTIPOINT = 'MultiPoint',
  MULTILINESTRING = 'MultiLineString',
  MULTIPOLYGON = 'MultiPolygon'
}

export interface SpatialFeature {
  id: string;
  geometry: Geometry;
  properties: Record<string, unknown>;
  layerId: string;
}
