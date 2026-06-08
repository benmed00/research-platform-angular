import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface EnvironmentalReadingListItem {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  quality: string;
}

/**
 * Environmental data explorer listing readings from the API.
 */
@Component({
  selector: 'app-environmental-data',
  templateUrl: './environmental-data.component.html',
  styleUrls: ['./environmental-data.component.scss']
})
export class EnvironmentalDataComponent implements OnInit {
  readings: EnvironmentalReadingListItem[] = [];
  loading = false;
  displayedColumns = ['type', 'location', 'timestamp', 'quality'];
  columnLabels: Record<string, string> = {
    type: 'Type',
    location: 'Lieu',
    timestamp: 'Date',
    quality: 'Qualité'
  };

  /**
   * Injects the API service for loading environmental readings.
   *
   * @param apiService - Loads environmental readings from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads readings on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadReadings();
  }

  /**
   * Fetches all readings from `/environmental-data/readings`.
   *
   * @returns Nothing.
   */
  loadReadings(): void {
    this.loading = true;
    this.apiService.get<EnvironmentalReadingListItem[]>('/environmental-data/readings').subscribe({
      next: (readings) => {
        this.readings = readings;
        this.loading = false;
      },
      error: () => {
        this.readings = [];
        this.loading = false;
      }
    });
  }
}
