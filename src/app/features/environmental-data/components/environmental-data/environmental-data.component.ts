import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ApiService } from '../../../../core/services/api.service';

interface EnvironmentalSummary {
  waterQualitySites: number;
  airMonitoringStations: number;
  climateRecords: number;
  geologySamples: number;
}

/**
 * Environmental monitoring overview with dataset counts.
 */
@Component({
  selector: 'app-environmental-data',
  templateUrl: './environmental-data.component.html',
  styleUrls: ['./environmental-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class EnvironmentalDataComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  summary: EnvironmentalSummary | null = null;

  /**
   * Loads environmental summary data on init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.apiService.get<EnvironmentalSummary>('/environmental-data/summary').subscribe({
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
