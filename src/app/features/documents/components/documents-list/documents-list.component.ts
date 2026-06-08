import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface DocumentListItem {
  id: string;
  title: string;
  type: string;
  category: string;
}

/**
 * Lists documents fetched from the `/documents` API endpoint.
 */
@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  documents: DocumentListItem[] = [];
  loading = false;
  displayedColumns = ['title', 'type', 'category'];
  columnLabels: Record<string, string> = {
    title: 'Titre',
    type: 'Type',
    category: 'Catégorie'
  };

  /**
   * Injects the API service for loading document records.
   *
   * @param apiService - Loads document records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads documents on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadDocuments();
  }

  /**
   * Fetches all documents from `/documents`.
   *
   * @returns Nothing.
   */
  loadDocuments(): void {
    this.loading = true;
    this.apiService.get<DocumentListItem[]>('/documents').subscribe({
      next: (documents) => {
        this.documents = documents;
        this.loading = false;
      },
      error: () => {
        this.documents = [];
        this.loading = false;
      }
    });
  }
}
