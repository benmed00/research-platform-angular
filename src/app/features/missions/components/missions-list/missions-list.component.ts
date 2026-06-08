import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface MissionListItem {
  id: string;
  name: string;
  status: string;
  startDate: string;
}

/**
 * Lists missions fetched from the `/missions` API endpoint.
 */
@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss']
})
export class MissionsListComponent implements OnInit {
  missions: MissionListItem[] = [];
  loading = false;
  displayedColumns = ['name', 'status', 'startDate'];
  columnLabels: Record<string, string> = {
    name: 'Mission',
    status: 'Statut',
    startDate: 'Début'
  };

  /**
   * Injects the API service for loading mission records.
   *
   * @param apiService - Loads mission records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads missions on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadMissions();
  }

  /**
   * Fetches all missions from `/missions`.
   *
   * @returns Nothing.
   */
  loadMissions(): void {
    this.loading = true;
    this.apiService.get<MissionListItem[]>('/missions').subscribe({
      next: (missions) => {
        this.missions = missions;
        this.loading = false;
      },
      error: () => {
        this.missions = [];
        this.loading = false;
      }
    });
  }
}
