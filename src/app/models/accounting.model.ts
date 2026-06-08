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
  createdBy: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

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

export enum SubventionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

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

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  method: PaymentMethod;
  reference: string;
  notes?: string;
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD'
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
}

export interface Report {
  id: string;
  type: ReportType;
  period: string;
  generatedDate: Date;
  fileUrl: string;
  format: ReportFormat;
}

export enum ReportType {
  FINANCIAL = 'FINANCIAL',
  BUDGET = 'BUDGET',
  SUBVENTION = 'SUBVENTION',
  EXPENSE = 'EXPENSE'
}

export enum ReportFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV'
}
