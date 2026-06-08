import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface EquipmentListItem {
  id: string;
  name: string;
  category: string;
  status: string;
}

/**
 * Lists equipment fetched from the `/equipment` API endpoint.
 */
@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {
  equipment: EquipmentListItem[] = [];
  loading = false;
  displayedColumns = ['name', 'category', 'status'];
  columnLabels: Record<string, string> = {
    name: 'Équipement',
    category: 'Catégorie',
    status: 'Statut'
  };

  /**
   * Injects the API service for loading equipment records.
   *
   * @param apiService - Loads equipment records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads equipment on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadEquipment();
  }

  /**
   * Fetches all equipment from `/equipment`.
   *
   * @returns Nothing.
   */
  loadEquipment(): void {
    this.loading = true;
    this.apiService.get<EquipmentListItem[]>('/equipment').subscribe({
      next: (equipment) => {
        this.equipment = equipment;
        this.loading = false;
      },
      error: () => {
        this.equipment = [];
        this.loading = false;
      }
    });
  }
}
