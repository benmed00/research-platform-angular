import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { Router } from '@angular/router';

/**
 * Static page shown when RoleGuard denies access to a route.
 */
@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class UnauthorizedComponent {
  /**
   * Injects the router for navigation back to the dashboard.
   *
   * @param router - Navigates back to the dashboard
   */
  constructor(private router: Router) {}

  /**
   * Returns the user to the dashboard.
   *
   * @returns Nothing.
   */
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
