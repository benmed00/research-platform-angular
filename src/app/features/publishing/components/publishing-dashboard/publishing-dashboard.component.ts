import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface PublicationListItem {
  id: string;
  title: string;
  type: string;
  status: string;
  year: number;
}

/**
 * Publishing dashboard listing publications from the API.
 */
@Component({
  selector: 'app-publishing-dashboard',
  templateUrl: './publishing-dashboard.component.html',
  styleUrls: ['./publishing-dashboard.component.scss']
})
export class PublishingDashboardComponent implements OnInit {
  publications: PublicationListItem[] = [];
  loading = false;
  displayedColumns = ['title', 'type', 'status', 'year'];
  columnLabels: Record<string, string> = {
    title: 'Titre',
    type: 'Type',
    status: 'Statut',
    year: 'Année'
  };

  /**
   * Injects the API service for loading publications.
   *
   * @param apiService - Loads publication records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads publications on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadPublications();
  }

  /**
   * Fetches all publications from `/publishing/publications`.
   *
   * @returns Nothing.
   */
  loadPublications(): void {
    this.loading = true;
    this.apiService.get<PublicationListItem[]>('/publishing/publications').subscribe({
      next: (publications) => {
        this.publications = publications;
        this.loading = false;
      },
      error: () => {
        this.publications = [];
        this.loading = false;
      }
    });
  }
}
