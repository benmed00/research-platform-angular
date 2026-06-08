import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface BudgetListItem {
  id: string;
  year: number;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
}

/**
 * Accounting dashboard listing budgets from the API.
 */
@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrls: ['./accounting-dashboard.component.scss']
})
export class AccountingDashboardComponent implements OnInit {
  budgets: BudgetListItem[] = [];
  loading = false;
  displayedColumns = ['year', 'category', 'allocatedAmount', 'spentAmount', 'remainingAmount'];
  columnLabels: Record<string, string> = {
    year: 'Année',
    category: 'Catégorie',
    allocatedAmount: 'Alloué',
    spentAmount: 'Dépensé',
    remainingAmount: 'Restant'
  };

  /**
   * Injects the API service for loading budget records.
   *
   * @param apiService - Loads budget records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads budgets on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadBudgets();
  }

  /**
   * Fetches all budgets from `/accounting/budgets`.
   *
   * @returns Nothing.
   */
  loadBudgets(): void {
    this.loading = true;
    this.apiService.get<BudgetListItem[]>('/accounting/budgets').subscribe({
      next: (budgets) => {
        this.budgets = budgets;
        this.loading = false;
      },
      error: () => {
        this.budgets = [];
        this.loading = false;
      }
    });
  }
}
