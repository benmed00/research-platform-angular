/**
 * @file Equipment inventory, maintenance, and assignment domain types.
 */

/** Research equipment asset tracked in the platform inventory. */
export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  serialNumber?: string;
  purchaseDate: Date;
  purchasePrice: number;
  /** Expected useful life, in months. */
  lifespan?: number;
  currentValue: number;
  status: EquipmentStatus;
  location?: string;
  /** Assigned platform user ID. */
  assignedTo?: string;
  /** Assigned mission ID. */
  assignedToMission?: string;
  maintenanceRecords: MaintenanceRecord[];
  specifications?: Record<string, unknown>;
  photos?: string[];
}

/** High-level equipment classification. */
export enum EquipmentCategory {
  VEHICLE = 'VEHICLE',
  BOAT = 'BOAT',
  SCIENTIFIC = 'SCIENTIFIC',
  IT = 'IT',
  CAMPING_FIELD = 'CAMPING_FIELD',
  LABORATORY = 'LABORATORY'
}

/** Operational status of an equipment asset. */
export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED',
  DAMAGED = 'DAMAGED'
}

/** Maintenance or inspection event for an equipment asset. */
export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  date: Date;
  performedBy?: string;
  cost: number;
  description: string;
  nextMaintenanceDate?: Date;
  documents?: string[];
}

/** Category of maintenance performed on equipment. */
export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  INSPECTION = 'INSPECTION',
  UPGRADE = 'UPGRADE'
}

/** Land vehicle extending the base {@link Equipment} record. */
export interface Vehicle extends Equipment {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  fuelType: string;
}

/** Marine vessel extending the base {@link Equipment} record. */
export interface Boat extends Equipment {
  name: string;
  registrationNumber: string;
  length: number;
  capacity: number;
  engineType: string;
  lastInspection?: Date;
}
