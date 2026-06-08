/**
 * @file GIS map layers, spatial queries, and feature domain types.
 */

/** GeoJSON-backed map layer displayed on the research platform map. */
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

/** Semantic category of a map layer. */
export enum LayerType {
  HABITAT = 'HABITAT',
  SPECIES = 'SPECIES',
  WEATHER_STATION = 'WEATHER_STATION',
  WATER_POINT = 'WATER_POINT',
  GEOLOGY = 'GEOLOGY',
  MISSION = 'MISSION',
  CUSTOM = 'CUSTOM'
}

/** Visual styling applied when rendering a map layer. */
export interface LayerStyle {
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  icon?: string;
  iconSize?: [number, number];
}

/** Saved map viewport with active layer selection. */
export interface MapView {
  center: Coordinates;
  zoom: number;
  bounds?: BoundingBox;
  /** Referenced {@link MapLayer} IDs. */
  layers: string[];
}

/** WGS84 geographic point. */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Rectangular map extent defined by cardinal bounds. */
export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

/** Spatial query against one or more map layers. */
export interface SpatialQuery {
  geometry: Geometry;
  layers?: string[];
  /** Search buffer distance, in meters. */
  buffer?: number;
}

/** GeoJSON-compatible geometry object. */
export interface Geometry {
  type: GeometryType;
  coordinates: number[] | number[][] | number[][][];
}

/** GeoJSON geometry type identifiers. */
export enum GeometryType {
  POINT = 'Point',
  LINESTRING = 'LineString',
  POLYGON = 'Polygon',
  MULTIPOINT = 'MultiPoint',
  MULTILINESTRING = 'MultiLineString',
  MULTIPOLYGON = 'MultiPolygon'
}

/** Feature returned from a spatial layer query. */
export interface SpatialFeature {
  id: string;
  geometry: Geometry;
  properties: Record<string, unknown>;
  layerId: string;
}
