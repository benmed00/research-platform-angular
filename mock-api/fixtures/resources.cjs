/** List-oriented mock resources served by protected GET endpoints. */
const dashboardStats = [
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

const missions = [
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

const species = [
  {
    id: 's-1',
    scientificName: 'Panthera leo',
    commonName: 'Lion',
    iucnStatus: 'VULNERABLE'
  },
  {
    id: 's-2',
    scientificName: 'Quercus suber',
    commonName: 'Chêne-liège',
    iucnStatus: 'LEAST_CONCERN'
  }
];

const equipment = [
  {
    id: 'e-1',
    name: 'Microscope électronique',
    category: 'SCIENTIFIC',
    status: 'ACTIVE'
  },
  {
    id: 'e-2',
    name: 'Véhicule terrain 4x4',
    category: 'VEHICLE',
    status: 'MAINTENANCE'
  }
];

const documents = [
  {
    id: 'd-1',
    title: 'Rapport biodiversité 2024',
    type: 'SCIENTIFIC_REPORT',
    category: 'REPORT'
  },
  {
    id: 'd-2',
    title: 'Procédure échantillonnage sol',
    type: 'PROTOCOL',
    category: 'PROCEDURE'
  }
];

const employees = [
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

const accountingSummary = {
  budgetTotal: '2 400 000 MAD',
  budgetConsumed: '1 560 000 MAD',
  pendingInvoices: 14,
  approvedGrants: 6
};

const environmentalSummary = {
  waterQualitySites: 18,
  airMonitoringStations: 7,
  climateRecords: 1240,
  geologySamples: 326
};

const gisSummary = {
  activeLayers: 12,
  mappedSites: 48,
  satelliteImages: 156,
  fieldTracks: 89
};

const publishingSummary = {
  manuscriptsInReview: 5,
  publishedThisYear: 11,
  pendingApprovals: 3,
  openAccessTitles: 8
};

const resourceRoutes = {
  '/api/dashboard/stats': dashboardStats,
  '/api/missions': missions,
  '/api/species': species,
  '/api/equipment': equipment,
  '/api/documents': documents,
  '/api/employees': employees,
  '/api/accounting/summary': accountingSummary,
  '/api/environmental-data/summary': environmentalSummary,
  '/api/gis/summary': gisSummary,
  '/api/publishing/summary': publishingSummary
};

module.exports = {
  dashboardStats,
  missions,
  species,
  equipment,
  documents,
  employees,
  accountingSummary,
  environmentalSummary,
  gisSummary,
  publishingSummary,
  resourceRoutes
};
