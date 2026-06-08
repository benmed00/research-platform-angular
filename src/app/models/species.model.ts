/**
 * @file Species catalog, taxonomy, and observation domain types.
 */

/** Catalogued species with taxonomy, conservation status, and observations. */
export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  /** Arabic common name. */
  commonNameAr?: string;
  kingdom: Kingdom;
  category: SpeciesCategory;
  iucnStatus: IUCNStatus;
  habitat: string[];
  geographicRange: GeographicRange;
  observations: Observation[];
  photos: string[];
  references: ScientificReference[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  /** User ID of the catalog entry creator. */
  createdBy: string;
}

/** Biological kingdom classification. */
export enum Kingdom {
  ANIMALIA = 'ANIMALIA',
  PLANTAE = 'PLANTAE',
  FUNGI = 'FUNGI',
  PROTISTA = 'PROTISTA',
  MONERA = 'MONERA'
}

/** Terrestrial or marine species category used in the catalog. */
export enum SpeciesCategory {
  FLORA_TERRESTRE = 'FLORA_TERRESTRE',
  FAUNE_TERRESTRE = 'FAUNE_TERRESTRE',
  FAUNE_MARINE = 'FAUNE_MARINE',
  EAU_DOUCE = 'EAU_DOUCE'
}

/**
 * IUCN Red List conservation status codes.
 * @enum {string}
 */
export enum IUCNStatus {
  /** Least Concern */
  LC = 'LC',
  /** Near Threatened */
  NT = 'NT',
  /** Vulnerable */
  VU = 'VU',
  /** Endangered */
  EN = 'EN',
  /** Critically Endangered */
  CR = 'CR',
  /** Extinct in the Wild */
  EW = 'EW',
  /** Extinct */
  EX = 'EX',
  /** Data Deficient */
  DD = 'DD'
}

/** Geographic distribution of a species. */
export interface GeographicRange {
  regions: string[];
  coordinates?: Coordinates[];
  elevationRange?: {
    min: number;
    max: number;
  };
}

/** WGS84 geographic point. */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Field observation record for a species. */
export interface Observation {
  id: string;
  speciesId: string;
  date: Date;
  location: Coordinates;
  /** User ID of the observer. */
  observerId: string;
  quantity?: number;
  condition?: string;
  notes?: string;
  photos?: string[];
  environmentalConditions?: EnvironmentalConditions;
}

/** Environmental readings captured during an observation. */
export interface EnvironmentalConditions {
  temperature?: number;
  humidity?: number;
  precipitation?: number;
  windSpeed?: number;
  waterQuality?: WaterQuality;
}

/** In-situ water quality measurements. */
export interface WaterQuality {
  pH?: number;
  dissolvedOxygen?: number;
  turbidity?: number;
  salinity?: number;
}

/** Bibliographic reference linked to a species entry. */
export interface ScientificReference {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  url?: string;
  pages?: string;
}
