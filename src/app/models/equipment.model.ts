export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  serialNumber?: string;
  purchaseDate: Date;
  purchasePrice: number;
  lifespan?: number; // in months
  currentValue: number;
  status: EquipmentStatus;
  location?: string;
  assignedTo?: string; // User ID
  assignedToMission?: string; // Mission ID
  maintenanceRecords: MaintenanceRecord[];
  specifications?: Record<string, unknown>;
  photos?: string[];
}

export enum EquipmentCategory {
  VEHICLE = 'VEHICLE',
  BOAT = 'BOAT',
  SCIENTIFIC = 'SCIENTIFIC',
  IT = 'IT',
  CAMPING_FIELD = 'CAMPING_FIELD',
  LABORATORY = 'LABORATORY'
}

export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED',
  DAMAGED = 'DAMAGED'
}

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

export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  INSPECTION = 'INSPECTION',
  UPGRADE = 'UPGRADE'
}

export interface Vehicle extends Equipment {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  fuelType: string;
}

export interface Boat extends Equipment {
  name: string;
  registrationNumber: string;
  length: number;
  capacity: number;
  engineType: string;
  lastInspection?: Date;
}
