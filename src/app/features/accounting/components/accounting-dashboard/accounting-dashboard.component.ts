import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ApiService } from '../../../../core/services/api.service';

interface AccountingSummary {
  budgetTotal: string;
  budgetConsumed: string;
  pendingInvoices: number;
  approvedGrants: number;
}

/**
 * Accounting overview with budget and invoice summary tiles.
 */
@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrls: ['./accounting-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class AccountingDashboardComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  summary: AccountingSummary | null = null;

  /**
   * Loads accounting summary data on init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.apiService.get<AccountingSummary>('/accounting/summary').subscribe({
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
