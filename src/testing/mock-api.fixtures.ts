import { LoginResponse, Permission, User, UserRole } from '../app/models/user.model';

/** Mirrors mock-api/fixtures/accounts.cjs for Angular integration tests. */
export const mockApiAccounts = [
  {
    email: 'scientifique@research.local',
    password: 'password123',
    user: {
      id: '1',
      email: 'scientifique@research.local',
      firstName: 'Marie',
      lastName: 'Dupont',
      role: UserRole.DIRECTEUR_SCIENTIFIQUE,
      permissions: [Permission.READ, Permission.WRITE, Permission.VALIDATE, Permission.ADMIN],
      isActive: true,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    } satisfies User
  },
  {
    email: 'admin@research.local',
    password: 'password123',
    user: {
      id: '2',
      email: 'admin@research.local',
      firstName: 'Jean',
      lastName: 'Martin',
      role: UserRole.DIRECTEUR_ADMIN_FINANCIER,
      permissions: [
        Permission.READ,
        Permission.WRITE,
        Permission.VALIDATE,
        Permission.DELETE,
        Permission.ADMIN
      ],
      isActive: true,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    } satisfies User
  }
] as const;

/**
 * Builds a {@link LoginResponse} matching mock-api account fixtures.
 *
 * @param email - Account email; defaults to the first fixture account
 * @param token - Optional JWT override; auto-generated when omitted
 * @returns Login response with token, expiry, and user profile
 */
export function createMockApiLoginResponse(
  email: string = mockApiAccounts[0].email,
  token?: string
): LoginResponse {
  const account = mockApiAccounts.find((entry) => entry.email === email) ?? mockApiAccounts[0];

  return {
    token: token ?? `mock-api-token-${account.user.id}`,
    expiresIn: 8 * 3600,
    user: account.user
  };
}

/**
 * Returns all mock-api user profiles.
 *
 * @returns Array of fixture users
 */
export function createMockApiUsers(): User[] {
  return mockApiAccounts.map((account) => account.user);
}

/** Dashboard stat tile shape returned by mock-api dashboard fixtures. */
export interface MockDashboardStat {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: { value: number; isPositive: boolean };
}

/**
 * Returns sample dashboard statistics for integration tests.
 *
 * @returns Fixture dashboard stat tiles
 */
export function createMockDashboardStats(): MockDashboardStat[] {
  return [
    {
      title: 'Espèces cataloguées',
      value: '1,234',
      icon: 'eco',
      color: '#27ae60',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Missions actives',
      value: '8',
      icon: 'explore',
      color: '#3498db',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Budget consommé',
      value: '65%',
      icon: 'account_balance',
      color: '#e67e22',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Équipements actifs',
      value: '42',
      icon: 'precision_manufacturing',
      color: '#9b59b6',
      trend: { value: 2, isPositive: true }
    }
  ];
}

/**
 * Returns sample mission records for integration tests.
 *
 * @returns Fixture mission list items
 */
export function createMockMissions() {
  return [
    {
      id: 'm-1',
      name: 'Inventaire faunique - Atlas',
      status: 'IN_PROGRESS',
      startDate: '2024-03-15'
    },
    {
      id: 'm-2',
      name: 'Campagne marine - Méditerranée',
      status: 'PLANNED',
      startDate: '2024-09-01'
    }
  ];
}

/**
 * Returns sample species records for integration tests.
 *
 * @returns Fixture species list items
 */
export function createMockSpecies() {
  return [
    { id: 's-1', scientificName: 'Panthera leo', commonName: 'Lion', iucnStatus: 'VULNERABLE' },
    {
      id: 's-2',
      scientificName: 'Quercus suber',
      commonName: 'Chêne-liège',
      iucnStatus: 'LEAST_CONCERN'
    }
  ];
}

/**
 * Returns sample equipment records for integration tests.
 *
 * @returns Fixture equipment list items
 */
export function createMockEquipment() {
  return [
    { id: 'e-1', name: 'Microscope électronique', category: 'SCIENTIFIC', status: 'ACTIVE' },
    { id: 'e-2', name: 'Véhicule terrain 4x4', category: 'VEHICLE', status: 'MAINTENANCE' }
  ];
}

/**
 * Returns sample document records for integration tests.
 *
 * @returns Fixture document list items
 */
export function createMockDocuments() {
  return [
    {
      id: 'd-1',
      title: 'Rapport biodiversité 2024',
      type: 'SCIENTIFIC_REPORT',
      category: 'REPORT'
    },
    { id: 'd-2', title: 'Procédure échantillonnage sol', type: 'PROTOCOL', category: 'PROCEDURE' }
  ];
}

/**
 * Returns sample employee records for integration tests.
 *
 * @returns Fixture employee list items
 */
export function createMockEmployees() {
  return [
    {
      id: 'emp-1',
      firstName: 'Ahmed',
      lastName: 'Benali',
      position: 'Chercheur senior',
      department: 'Botanique',
      status: 'ACTIVE'
    },
    {
      id: 'emp-2',
      firstName: 'Fatima',
      lastName: 'Alaoui',
      position: 'Technicienne labo',
      department: 'Laboratoire',
      status: 'ACTIVE'
    }
  ];
}
