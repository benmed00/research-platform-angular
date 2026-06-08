export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  commonNameAr?: string; // Arabic name
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
  createdBy: string;
}

export enum Kingdom {
  ANIMALIA = 'ANIMALIA',
  PLANTAE = 'PLANTAE',
  FUNGI = 'FUNGI',
  PROTISTA = 'PROTISTA',
  MONERA = 'MONERA'
}

export enum SpeciesCategory {
  FLORA_TERRESTRE = 'FLORA_TERRESTRE',
  FAUNE_TERRESTRE = 'FAUNE_TERRESTRE',
  FAUNE_MARINE = 'FAUNE_MARINE',
  EAU_DOUCE = 'EAU_DOUCE'
}

export enum IUCNStatus {
  LC = 'LC', // Least Concern
  NT = 'NT', // Near Threatened
  VU = 'VU', // Vulnerable
  EN = 'EN', // Endangered
  CR = 'CR', // Critically Endangered
  EW = 'EW', // Extinct in the Wild
  EX = 'EX', // Extinct
  DD = 'DD' // Data Deficient
}

export interface GeographicRange {
  regions: string[];
  coordinates?: Coordinates[];
  elevationRange?: {
    min: number;
    max: number;
  };
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Observation {
  id: string;
  speciesId: string;
  date: Date;
  location: Coordinates;
  observerId: string;
  quantity?: number;
  condition?: string;
  notes?: string;
  photos?: string[];
  environmentalConditions?: EnvironmentalConditions;
}

export interface EnvironmentalConditions {
  temperature?: number;
  humidity?: number;
  precipitation?: number;
  windSpeed?: number;
  waterQuality?: WaterQuality;
}

export interface WaterQuality {
  pH?: number;
  dissolvedOxygen?: number;
  turbidity?: number;
  salinity?: number;
}

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
