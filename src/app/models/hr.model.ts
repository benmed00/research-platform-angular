/**
 * @file Human resources, payroll, and leave management domain types.
 */

/** Employee HR record linked to a platform user account. */
export interface Employee {
  id: string;
  /** Referenced platform user ID. */
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
  documents?: HrDocument[];
  evaluations?: Evaluation[];
  leaves?: Leave[];
  /** Referenced mission IDs. */
  missions?: string[];
}

/** Employment contract classification. */
export enum ContractType {
  PERMANENT = 'PERMANENT',
  TEMPORARY = 'TEMPORARY',
  CONSULTANT = 'CONSULTANT',
  INTERN = 'INTERN'
}

/** Current employment status of an employee. */
export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
  SUSPENDED = 'SUSPENDED'
}

/** Emergency contact details for an employee. */
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

/** HR file attached to an employee record (contract, ID, certificate). */
export interface HrDocument {
  id: string;
  type: HrDocumentType;
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
  expiryDate?: Date;
}

/** Type of HR document stored on an employee file. */
export enum HrDocumentType {
  CONTRACT = 'CONTRACT',
  ID_CARD = 'ID_CARD',
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER'
}

/** Performance evaluation for an employee. */
export interface Evaluation {
  id: string;
  employeeId: string;
  /** User ID of the evaluator. */
  evaluatorId: string;
  evaluationDate: Date;
  period: string;
  score: number;
  comments: string;
  goals: string[];
}

/** Leave request submitted by an employee. */
export interface Leave {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  days: number;
  status: LeaveStatus;
  reason?: string;
  /** User ID of the approver. */
  approvedBy?: string;
  approvedDate?: Date;
}

/** Category of employee leave. */
export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  UNPAID = 'UNPAID',
  OTHER = 'OTHER'
}

/** Approval workflow state of a leave request. */
export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

/** Payroll record for a pay period. */
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

/** One-off salary bonus line item. */
export interface Bonus {
  type: BonusType;
  amount: number;
  description?: string;
}

/** Bonus category reflecting field or performance conditions. */
export enum BonusType {
  FIELD = 'FIELD',
  MARINE = 'MARINE',
  RISK = 'RISK',
  PERFORMANCE = 'PERFORMANCE',
  OTHER = 'OTHER'
}

/** Payroll deduction line item. */
export interface Deduction {
  type: string;
  amount: number;
  description?: string;
}
