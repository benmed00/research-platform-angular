import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

/**
 * Application header with sidebar toggle, user display, and logout.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  currentUser: User | null;

  /**
   * Injects auth service and router for session display and logout.
   *
   * @param authService - Provides current user state and logout
   * @param router - Navigates to login after logout
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  /**
   * Emits a sidebar toggle event to the parent layout.
   *
   * @returns Nothing.
   */
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  /**
   * Clears the session and navigates to the login page.
   *
   * @returns Nothing.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
