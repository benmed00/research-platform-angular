/**
 * @file Authentication and user identity domain types.
 * @see AuthService
 * @see RoleGuard
 */

/**
 * Platform roles assigned to research center staff.
 * @enum {string}
 */
export enum UserRole {
  DIRECTEUR_SCIENTIFIQUE = 'DIRECTEUR_SCIENTIFIQUE',
  DIRECTEUR_ADMIN_FINANCIER = 'DIRECTEUR_ADMIN_FINANCIER',
  BOTANISTE = 'BOTANISTE',
  ZOOLOGISTE_TERRESTRE = 'ZOOLOGISTE_TERRESTRE',
  BIOLOGISTE_MARIN = 'BIOLOGISTE_MARIN',
  HYDROBIOLOGISTE = 'HYDROBIOLOGISTE',
  GEOLOGUE = 'GEOLOGUE',
  CLIMATOLOGUE = 'CLIMATOLOGUE',
  DATA_SCIENTIST_SIG = 'DATA_SCIENTIST_SIG',
  INGENIEUR_PLATEFORMES = 'INGENIEUR_PLATEFORMES',
  TECHNICIEN_LABORATOIRE = 'TECHNICIEN_LABORATOIRE',
  TECHNICIEN_TERRAIN = 'TECHNICIEN_TERRAIN',
  MARIN_PILOTE = 'MARIN_PILOTE',
  LOGISTICIEN = 'LOGISTICIEN',
  COMMUNICATION_EDITION = 'COMMUNICATION_EDITION'
}

/**
 * Fine-grained access permissions granted to a user.
 * @enum {string}
 */
export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  VALIDATE = 'VALIDATE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN'
}

/**
 * Platform user with role-based permissions.
 */
export interface User {
  /** Unique user identifier. */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /** Assigned platform role; drives RoleGuard route checks. */
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

/** Optional extended profile fields for a {@link User}. */
export interface UserProfile {
  phone?: string;
  address?: string;
  department?: string;
  specialization?: string;
  photoUrl?: string;
}

/** Credentials submitted to the auth login endpoint. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Successful authentication response from the auth API. */
export interface LoginResponse {
  /** JWT persisted by AuthService. */
  token: string;
  user: User;
  /** Token lifetime in seconds. */
  expiresIn: number;
}
