/** Shared mock accounts used by the dev server and automated API tests. */
const accounts = [
  {
    email: 'scientifique@research.local',
    password: 'password123',
    user: {
      id: '1',
      email: 'scientifique@research.local',
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'DIRECTEUR_SCIENTIFIQUE',
      permissions: ['READ', 'WRITE', 'VALIDATE', 'ADMIN'],
      isActive: true,
      status: 'Actif',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'admin@research.local',
    password: 'password123',
    user: {
      id: '2',
      email: 'admin@research.local',
      firstName: 'Jean',
      lastName: 'Martin',
      role: 'DIRECTEUR_ADMIN_FINANCIER',
      permissions: ['READ', 'WRITE', 'VALIDATE', 'DELETE', 'ADMIN'],
      isActive: true,
      status: 'Actif',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'botaniste@research.local',
    password: 'password123',
    user: {
      id: '3',
      email: 'botaniste@research.local',
      firstName: 'Sophie',
      lastName: 'Bernard',
      role: 'BOTANISTE',
      permissions: ['READ', 'WRITE'],
      isActive: true,
      status: 'Actif',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
];

module.exports = { accounts };
