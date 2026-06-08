import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';

/**
 * Publishing module dashboard for managing reports and exports.
 *
 * @remarks Implementation pending — placeholder for the publishing feature module.
 * @see publishing.model — Publication
 */
@Component({
  selector: 'app-publishing-dashboard',
  templateUrl: './publishing-dashboard.component.html',
  styleUrls: ['./publishing-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class PublishingDashboardComponent {}
