export interface Employee {
  id: string;
  userId: string;
  employeeNumber: string;
  contractType: ContractType;
  startDate: Date;
  endDate?: Date;
  salary: number;
  position: string;
  department: string;
  status: EmployeeStatus;
  emergencyContact?: EmergencyContact;
  documents?: Document[];
  evaluations?: Evaluation[];
  leaves?: Leave[];
  missions?: string[]; // Mission IDs
}

export enum ContractType {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
  CONSULTANT = 'CONSULTANT',
  INTERN = 'INTERN'
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
  SUSPENDED = 'SUSPENDED'
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Document {
  id: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
  expiryDate?: Date;
}

export enum DocumentType {
  CONTRACT = 'CONTRACT',
  ID_CARD = 'ID_CARD',
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER'
}

export interface Evaluation {
  id: string;
  employeeId: string;
  evaluatorId: string;
  evaluationDate: Date;
  period: string;
  score: number;
  comments: string;
  goals: string[];
}

export interface Leave {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  days: number;
  status: LeaveStatus;
  reason?: string;
  approvedBy?: string;
  approvedDate?: Date;
}

export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  UNPAID = 'UNPAID',
  OTHER = 'OTHER'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface Salary {
  id: string;
  employeeId: string;
  baseSalary: number;
  bonuses: Bonus[];
  deductions: Deduction[];
  netSalary: number;
  period: string;
  paymentDate: Date;
}

export interface Bonus {
  type: BonusType;
  amount: number;
  description?: string;
}

export enum BonusType {
  FIELD = 'FIELD',
  MARINE = 'MARINE',
  RISK = 'RISK',
  PERFORMANCE = 'PERFORMANCE',
  OTHER = 'OTHER'
}

export interface Deduction {
  type: string;
  amount: number;
  description?: string;
}
