import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface EmployeeListItem {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  status: string;
}

/**
 * Lists employees fetched from the `/employees` API endpoint.
 */
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees: EmployeeListItem[] = [];
  loading = false;
  displayedColumns = ['firstName', 'lastName', 'position', 'department', 'status'];
  columnLabels: Record<string, string> = {
    firstName: 'Prénom',
    lastName: 'Nom',
    position: 'Poste',
    department: 'Département',
    status: 'Statut'
  };

  /**
   * Injects the API service for loading employee records.
   *
   * @param apiService - Loads employee records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads employees on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Fetches all employees from `/employees`.
   *
   * @returns Nothing.
   */
  loadEmployees(): void {
    this.loading = true;
    this.apiService.get<EmployeeListItem[]>('/employees').subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      error: () => {
        this.employees = [];
        this.loading = false;
      }
    });
  }
}
