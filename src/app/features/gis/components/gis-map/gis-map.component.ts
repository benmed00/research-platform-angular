import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

export interface MapLayerListItem {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  opacity: number;
}

/**
 * GIS map view listing available map layers from the API.
 */
@Component({
  selector: 'app-gis-map',
  templateUrl: './gis-map.component.html',
  styleUrls: ['./gis-map.component.scss']
})
export class GisMapComponent implements OnInit {
  layers: MapLayerListItem[] = [];
  loading = false;
  displayedColumns = ['name', 'type', 'visible', 'opacity'];
  columnLabels: Record<string, string> = {
    name: 'Couche',
    type: 'Type',
    visible: 'Visible',
    opacity: 'Opacité'
  };

  /**
   * Injects the API service for loading map layers.
   *
   * @param apiService - Loads GIS layer records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads map layers on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadLayers();
  }

  /**
   * Fetches all layers from `/gis/layers`.
   *
   * @returns Nothing.
   */
  loadLayers(): void {
    this.loading = true;
    this.apiService.get<MapLayerListItem[]>('/gis/layers').subscribe({
      next: (layers) => {
        this.layers = layers;
        this.loading = false;
      },
      error: () => {
        this.layers = [];
        this.loading = false;
      }
    });
  }
}
