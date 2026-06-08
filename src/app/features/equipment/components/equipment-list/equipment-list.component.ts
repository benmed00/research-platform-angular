import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
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
  styleUrls: ['./equipment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class EquipmentListComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

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
    this.cdr.markForCheck();
    this.apiService.get<EquipmentListItem[]>('/equipment').subscribe({
      next: (equipment) => {
        this.equipment = equipment;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.equipment = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
