/**
 * @file Field mission planning, execution, and reporting domain types.
 */

/** Field research mission with team, equipment, and reporting lifecycle. */
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
  /** Referenced equipment record IDs. */
  equipment: string[];
  budget?: number;
  report?: MissionReport;
  attachments: Attachment[];
  createdAt: Date;
  /** User ID of the mission creator. */
  createdBy: string;
}

/** Category of field activity performed during a mission. */
export enum MissionType {
  FIELD_RESEARCH = 'FIELD_RESEARCH',
  MARINE_RESEARCH = 'MARINE_RESEARCH',
  SAMPLING = 'SAMPLING',
  MONITORING = 'MONITORING',
  SURVEY = 'SURVEY',
  OTHER = 'OTHER'
}

/** Lifecycle state of a mission. */
export enum MissionStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

/** Named geographic area associated with a mission. */
export interface GeographicLocation {
  name: string;
  coordinates: Coordinates;
  /** Area covered, in km². */
  area?: number;
  region: string;
  country: string;
}

/** WGS84 geographic point. */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Team member assigned to a mission with responsibilities. */
export interface MissionTeamMember {
  /** Referenced platform user ID. */
  userId: string;
  role: string;
  responsibilities: string[];
}

/** Post-mission scientific report. */
export interface MissionReport {
  id: string;
  missionId: string;
  summary: string;
  findings: string[];
  dataCollected: string[];
  recommendations: string[];
  /** User ID of the report author. */
  authorId: string;
  createdAt: Date;
  attachments: string[];
}

/** File attached to a mission or report. */
export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: AttachmentType;
  uploadDate: Date;
  /** User ID of the uploader. */
  uploadedBy: string;
  description?: string;
}

/** Type of file attached to a mission. */
export enum AttachmentType {
  PHOTO = 'PHOTO',
  DOCUMENT = 'DOCUMENT',
  GPS_TRACK = 'GPS_TRACK',
  DATA_FILE = 'DATA_FILE',
  OTHER = 'OTHER'
}
