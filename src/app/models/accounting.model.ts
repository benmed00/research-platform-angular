/**
 * @file Budget, invoicing, payments, and financial reporting domain types.
 */

/** Annual or project budget with allocated and spent amounts. */
export interface Budget {
  id: string;
  year: number;
  category: BudgetCategory;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  projectId?: string;
  subventionId?: string;
  transactions: Transaction[];
}

/** Budget line classification. */
export enum BudgetCategory {
  SALARIES = 'SALARIES',
  EQUIPMENT = 'EQUIPMENT',
  FIELD_MISSIONS = 'FIELD_MISSIONS',
  LABORATORY = 'LABORATORY',
  TRANSPORT = 'TRANSPORT',
  SUPPLIES = 'SUPPLIES',
  SERVICES = 'SERVICES',
  OTHER = 'OTHER'
}

/** Financial transaction debiting or crediting a budget. */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  description: string;
  category: BudgetCategory;
  budgetId: string;
  invoiceId?: string;
  paymentId?: string;
  /** User ID of the transaction creator. */
  createdBy: string;
}

/** Direction of a financial transaction. */
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

/** External funding grant tracked against project budgets. */
export interface Subvention {
  id: string;
  name: string;
  provider: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  status: SubventionStatus;
  conditions: string;
  reports: Report[];
}

/** Lifecycle state of a funding subvention. */
export enum SubventionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

/** Supplier invoice awaiting or confirming payment. */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  amount: number;
  tax: number;
  totalAmount: number;
  issueDate: Date;
  dueDate: Date;
  status: InvoiceStatus;
  items: InvoiceItem[];
  fileUrl?: string;
}

/** Payment workflow state of an invoice. */
export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

/** Line item on a supplier invoice. */
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

/** Payment applied against an invoice. */
export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  method: PaymentMethod;
  reference: string;
  notes?: string;
}

/** Method used to settle an invoice. */
export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD'
}

/** Vendor or service provider referenced by invoices. */
export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
}

/** Generated financial or budget report file. */
export interface Report {
  id: string;
  type: ReportType;
  period: string;
  generatedDate: Date;
  fileUrl: string;
  format: ReportFormat;
}

/** Category of financial report. */
export enum ReportType {
  FINANCIAL = 'FINANCIAL',
  BUDGET = 'BUDGET',
  SUBVENTION = 'SUBVENTION',
  EXPENSE = 'EXPENSE'
}

/** Export format of a generated report. */
export enum ReportFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV'
}
