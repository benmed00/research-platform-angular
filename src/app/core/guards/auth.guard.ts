import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Blocks unauthenticated navigation and redirects to `/login`.
 *
 * @see AuthService.isAuthenticated
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Injects auth and router services for route protection.
   *
   * @param authService - Provides JWT validation for route access
   * @param router - Used to redirect unauthenticated users to login
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Allows navigation when a non-expired JWT exists; otherwise redirects to login.
   *
   * @param route - Activated route snapshot (unused)
   * @param state - Router state; `url` is passed as `returnUrl` query param
   * @returns `true` when the user is authenticated
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
