import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { DataTableValueFormatter } from '../../../../shared/components/data-table/data-table.component';
import { formatMissionStatus } from '../../../../shared/display-formatters';
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
  styleUrls: ['./missions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class MissionsListComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

  missions: MissionListItem[] = [];
  loading = false;
  displayedColumns = ['name', 'status', 'startDate'];
  columnLabels: Record<string, string> = {
    name: 'Mission',
    status: 'Statut',
    startDate: 'Début'
  };
  valueFormatters: Record<string, DataTableValueFormatter> = {
    status: (row) => formatMissionStatus((row as MissionListItem).status)
  };

  private readonly apiService = inject(ApiService);

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
    this.cdr.markForCheck();
    this.apiService.get<MissionListItem[]>('/missions').subscribe({
      next: (missions) => {
        this.missions = missions;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.missions = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
