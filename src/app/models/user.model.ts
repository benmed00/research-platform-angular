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

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  VALIDATE = 'VALIDATE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  phone?: string;
  address?: string;
  department?: string;
  specialization?: string;
  photoUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}
