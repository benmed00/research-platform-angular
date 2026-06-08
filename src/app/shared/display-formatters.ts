import { UserRole } from '../models/user.model';

/** French labels for {@link UserRole} values shown in tables and forms. */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.DIRECTEUR_SCIENTIFIQUE]: 'Direction Scientifique',
  [UserRole.DIRECTEUR_ADMIN_FINANCIER]: 'Direction Administrative',
  [UserRole.BOTANISTE]: 'Botaniste',
  [UserRole.ZOOLOGISTE_TERRESTRE]: 'Zoologiste Terrestre',
  [UserRole.BIOLOGISTE_MARIN]: 'Biologiste Marin',
  [UserRole.HYDROBIOLOGISTE]: 'Hydrobiologiste',
  [UserRole.GEOLOGUE]: 'Géologue',
  [UserRole.CLIMATOLOGUE]: 'Climatologue',
  [UserRole.DATA_SCIENTIST_SIG]: 'Data Scientist SIG',
  [UserRole.INGENIEUR_PLATEFORMES]: 'Ingénieur Plateformes',
  [UserRole.TECHNICIEN_LABORATOIRE]: 'Technicien Laboratoire',
  [UserRole.TECHNICIEN_TERRAIN]: 'Technicien Terrain',
  [UserRole.MARIN_PILOTE]: 'Marin Pilote',
  [UserRole.LOGISTICIEN]: 'Logisticien',
  [UserRole.COMMUNICATION_EDITION]: 'Communication & Édition'
};

/** French labels for common mission status codes. */
export const MISSION_STATUS_LABELS: Record<string, string> = {
  PLANNED: 'Planifiée',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée'
};

/** French labels for equipment status codes. */
export const EQUIPMENT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Actif',
  MAINTENANCE: 'Maintenance',
  RETIRED: 'Retiré'
};

/**
 * Resolves a user role enum value to a French display label.
 *
 * @param role - Platform role enum value
 * @returns Human-readable role label
 */
export function formatUserRole(role: UserRole | string): string {
  return USER_ROLE_LABELS[role as UserRole] ?? String(role);
}

/**
 * Formats an active flag as a French status string.
 *
 * @param isActive - Whether the user account is active
 * @returns `Actif` or `Inactif`
 */
export function formatActiveStatus(isActive: boolean): string {
  return isActive ? 'Actif' : 'Inactif';
}

/**
 * Resolves a mission status code to a French label.
 *
 * @param status - Mission status code from the API
 * @returns Human-readable status label
 */
export function formatMissionStatus(status: string): string {
  return MISSION_STATUS_LABELS[status] ?? status;
}

/**
 * Resolves an equipment status code to a French label.
 *
 * @param status - Equipment status code from the API
 * @returns Human-readable status label
 */
export function formatEquipmentStatus(status: string): string {
  return EQUIPMENT_STATUS_LABELS[status] ?? status;
}
