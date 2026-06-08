export interface Mission {
  id: string;
  name: string;
  description: string;
  type: MissionType;
  status: MissionStatus;
  startDate: Date;
  endDate: Date;
  location: GeographicLocation;
  objectives: string[];
  team: MissionTeamMember[];
  equipment: string[]; // Equipment IDs
  budget?: number;
  report?: MissionReport;
  attachments: Attachment[];
  createdAt: Date;
  createdBy: string;
}

export enum MissionType {
  FIELD_RESEARCH = 'FIELD_RESEARCH',
  MARINE_RESEARCH = 'MARINE_RESEARCH',
  SAMPLING = 'SAMPLING',
  MONITORING = 'MONITORING',
  SURVEY = 'SURVEY',
  OTHER = 'OTHER'
}

export enum MissionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface GeographicLocation {
  name: string;
  coordinates: Coordinates;
  area?: number; // in km²
  region: string;
  country: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MissionTeamMember {
  userId: string;
  role: string;
  responsibilities: string[];
}

export interface MissionReport {
  id: string;
  missionId: string;
  summary: string;
  findings: string[];
  dataCollected: string[];
  recommendations: string[];
  authorId: string;
  createdAt: Date;
  attachments: string[];
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: AttachmentType;
  uploadDate: Date;
  uploadedBy: string;
  description?: string;
}

export enum AttachmentType {
  PHOTO = 'PHOTO',
  DOCUMENT = 'DOCUMENT',
  GPS_TRACK = 'GPS_TRACK',
  DATA_FILE = 'DATA_FILE',
  OTHER = 'OTHER'
}
