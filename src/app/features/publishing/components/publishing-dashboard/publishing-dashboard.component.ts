import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ApiService } from '../../../../core/services/api.service';

interface PublishingSummary {
  manuscriptsInReview: number;
  publishedThisYear: number;
  pendingApprovals: number;
  openAccessTitles: number;
}

/**
 * Publishing workflow overview with manuscript and approval counts.
 */
@Component({
  selector: 'app-publishing-dashboard',
  templateUrl: './publishing-dashboard.component.html',
  styleUrls: ['./publishing-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class PublishingDashboardComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  summary: PublishingSummary | null = null;

  /**
   * Loads publishing summary data on init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.apiService.get<PublishingSummary>('/publishing/summary').subscribe({
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
