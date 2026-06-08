import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ApiService } from '../../../../core/services/api.service';

interface GisSummary {
  activeLayers: number;
  mappedSites: number;
  satelliteImages: number;
  fieldTracks: number;
}

/**
 * GIS overview with mapped assets and layer counts.
 */
@Component({
  selector: 'app-gis-map',
  templateUrl: './gis-map.component.html',
  styleUrls: ['./gis-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class GisMapComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  summary: GisSummary | null = null;

  /**
   * Loads GIS summary data on init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.apiService.get<GisSummary>('/gis/summary').subscribe({
      next: (summary) => {
        this.summary = summary;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.summary = null;
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
