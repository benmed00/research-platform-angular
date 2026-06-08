/**
 * @file Environmental monitoring data, sensors, and time series domain types.
 */

/** Single environmental measurement at a location and timestamp. */
export interface EnvironmentalData {
  id: string;
  type: DataType;
  location: GeographicLocation;
  timestamp: Date;
  values: DataValues;
  source: DataSource;
  quality: DataQuality;
  metadata?: Record<string, unknown>;
}

/** Category of environmental measurement. */
export enum DataType {
  WATER_QUALITY = 'WATER_QUALITY',
  AIR_QUALITY = 'AIR_QUALITY',
  CLIMATE = 'CLIMATE',
  GEOLOGY = 'GEOLOGY',
  SOIL = 'SOIL'
}

/** Geographic context for an environmental reading. */
export interface GeographicLocation {
  name: string;
  coordinates: Coordinates;
  elevation?: number;
  type: LocationType;
}

/** Type of sampling or monitoring location. */
export enum LocationType {
  SEA = 'SEA',
  SOURCE = 'SOURCE',
  DAM = 'DAM',
  RIVER = 'RIVER',
  STATION = 'STATION',
  FIELD = 'FIELD'
}

/** WGS84 geographic point. */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Open-ended key-value payload for environmental readings. */
export interface DataValues {
  [key: string]: number | string | boolean | undefined | { nitrates?: number; phosphates?: number };
}

/** Structured water quality parameters. */
export interface WaterQualityData extends DataValues {
  pH: number;
  temperature: number;
  dissolvedOxygen: number;
  turbidity: number;
  salinity?: number;
  conductivity?: number;
  nutrients?: {
    nitrates?: number;
    phosphates?: number;
  };
}

/** Structured air quality parameters. */
export interface AirQualityData extends DataValues {
  pm25?: number;
  pm10?: number;
  no2?: number;
  o3?: number;
  co?: number;
  so2?: number;
}

/** Structured climate parameters. */
export interface ClimateData extends DataValues {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  pressure?: number;
  solarRadiation?: number;
}

/** Origin of an environmental data record. */
export enum DataSource {
  SENSOR = 'SENSOR',
  MANUAL = 'MANUAL',
  CSV_IMPORT = 'CSV_IMPORT',
  API = 'API',
  FIELD_COLLECTION = 'FIELD_COLLECTION'
}

/** Reliability assessment of a data record. */
export enum DataQuality {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  UNKNOWN = 'UNKNOWN'
}

/** Time-bounded series of readings for a single parameter. */
export interface TimeSeries {
  id: string;
  dataType: DataType;
  location: GeographicLocation;
  parameter: string;
  unit: string;
  dataPoints: DataPoint[];
  startDate: Date;
  endDate: Date;
}

/** Single timestamped value within a {@link TimeSeries}. */
export interface DataPoint {
  timestamp: Date;
  value: number;
  quality: DataQuality;
}

/** Field or laboratory sensor producing environmental readings. */
export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  location: GeographicLocation;
  parameters: string[];
  status: SensorStatus;
  lastReading?: Date;
  calibrationDate?: Date;
  nextCalibrationDate?: Date;
}

/** Sensor measurement category. */
export enum SensorType {
  WATER_QUALITY = 'WATER_QUALITY',
  AIR_QUALITY = 'AIR_QUALITY',
  WEATHER = 'WEATHER',
  SOIL = 'SOIL',
  OTHER = 'OTHER'
}

/** Operational state of a sensor. */
export enum SensorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  ERROR = 'ERROR'
}
