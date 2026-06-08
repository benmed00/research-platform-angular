import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';

/**
 * Application header with sidebar toggle, user display, and logout.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class HeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @Output() toggleSidebar = new EventEmitter<void>();

  currentUser: User | null = null;

  /**
   * Initializes the header with the current user and listens for auth updates.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.currentUser = user;
      this.cdr.markForCheck();
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
    void this.router.navigate(['/login']);
  }
}
