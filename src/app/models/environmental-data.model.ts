export interface EnvironmentalData {
  id: string;
  type: DataType;
  location: GeographicLocation;
  timestamp: Date;
  values: DataValues;
  source: DataSource;
  quality: DataQuality;
  metadata?: Record<string, any>;
}

export enum DataType {
  WATER_QUALITY = 'WATER_QUALITY',
  AIR_QUALITY = 'AIR_QUALITY',
  CLIMATE = 'CLIMATE',
  GEOLOGY = 'GEOLOGY',
  SOIL = 'SOIL'
}

export interface GeographicLocation {
  name: string;
  coordinates: Coordinates;
  elevation?: number;
  type: LocationType;
}

export enum LocationType {
  SEA = 'SEA',
  SOURCE = 'SOURCE',
  DAM = 'DAM',
  RIVER = 'RIVER',
  STATION = 'STATION',
  FIELD = 'FIELD'
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DataValues {
  [key: string]: number | string | boolean;
}

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

export interface AirQualityData extends DataValues {
  pm25?: number;
  pm10?: number;
  no2?: number;
  o3?: number;
  co?: number;
  so2?: number;
}

export interface ClimateData extends DataValues {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  pressure?: number;
  solarRadiation?: number;
}

export enum DataSource {
  SENSOR = 'SENSOR',
  MANUAL = 'MANUAL',
  CSV_IMPORT = 'CSV_IMPORT',
  API = 'API',
  FIELD_COLLECTION = 'FIELD_COLLECTION'
}

export enum DataQuality {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  UNKNOWN = 'UNKNOWN'
}

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

export interface DataPoint {
  timestamp: Date;
  value: number;
  quality: DataQuality;
}

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

export enum SensorType {
  WATER_QUALITY = 'WATER_QUALITY',
  AIR_QUALITY = 'AIR_QUALITY',
  WEATHER = 'WEATHER',
  SOIL = 'SOIL',
  OTHER = 'OTHER'
}

export enum SensorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  ERROR = 'ERROR'
}
