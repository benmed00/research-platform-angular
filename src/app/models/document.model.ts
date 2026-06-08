/**
 * @file Document management, versioning, and access control domain types.
 */

/** Managed document with versioning and access rights. */
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
  /** Parent document ID when this record is a version revision. */
  parentId?: string;
  tags: string[];
  metadata: DocumentMetadata;
  accessRights: AccessRights;
  createdAt: Date;
  updatedAt: Date;
  /** User ID of the document creator. */
  createdBy: string;
  /** User ID of the last editor. */
  updatedBy: string;
}

/** Scientific or administrative document classification. */
export enum DocumentType {
  SCIENTIFIC_REPORT = 'SCIENTIFIC_REPORT',
  ADMINISTRATIVE_REPORT = 'ADMINISTRATIVE_REPORT',
  RAW_DATA = 'RAW_DATA',
  PUBLICATION = 'PUBLICATION',
  PRESENTATION = 'PRESENTATION',
  PROTOCOL = 'PROTOCOL',
  OTHER = 'OTHER'
}

/** Organizational category for document filing. */
export enum DocumentCategory {
  RESEARCH = 'RESEARCH',
  ADMINISTRATION = 'ADMINISTRATION',
  FINANCE = 'FINANCE',
  HR = 'HR',
  LOGISTICS = 'LOGISTICS',
  PUBLICATIONS = 'PUBLICATIONS'
}

/** Bibliographic and project metadata attached to a document. */
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

/** Role- and user-based access control for a document. */
export interface AccessRights {
  public: boolean;
  roles: string[];
  users: string[];
  permissions: Permission[];
}

/** Document-level permission flags (distinct from auth permissions in user.model). */
export enum Permission {
  READ = 'READ',
  DOWNLOAD = 'DOWNLOAD',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

/** Immutable snapshot of a prior document version. */
export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileUrl: string;
  changeLog: string;
  createdAt: Date;
  /** User ID of the version author. */
  createdBy: string;
}
