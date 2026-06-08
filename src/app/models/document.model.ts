export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  category: DocumentCategory;
  description?: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  version: number;
  currentVersion: boolean;
  parentId?: string; // For versioning
  tags: string[];
  metadata: DocumentMetadata;
  accessRights: AccessRights;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export enum DocumentType {
  SCIENTIFIC_REPORT = 'SCIENTIFIC_REPORT',
  ADMINISTRATIVE_REPORT = 'ADMINISTRATIVE_REPORT',
  RAW_DATA = 'RAW_DATA',
  PUBLICATION = 'PUBLICATION',
  PRESENTATION = 'PRESENTATION',
  PROTOCOL = 'PROTOCOL',
  OTHER = 'OTHER'
}

export enum DocumentCategory {
  RESEARCH = 'RESEARCH',
  ADMINISTRATION = 'ADMINISTRATION',
  FINANCE = 'FINANCE',
  HR = 'HR',
  LOGISTICS = 'LOGISTICS',
  PUBLICATIONS = 'PUBLICATIONS'
}

export interface DocumentMetadata {
  authors?: string[];
  year?: number;
  projectId?: string;
  missionId?: string;
  keywords?: string[];
  language?: string;
  pages?: number;
  doi?: string;
  isbn?: string;
}

export interface AccessRights {
  public: boolean;
  roles: string[];
  users: string[];
  permissions: Permission[];
}

export enum Permission {
  READ = 'READ',
  DOWNLOAD = 'DOWNLOAD',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileUrl: string;
  changeLog: string;
  createdAt: Date;
  createdBy: string;
}
