import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models/user.model';

/**
 * Enforces route-level role requirements declared in `route.data.roles`.
 *
 * @see AuthService.getCurrentUser
 * @remarks UI guard only; backend must enforce authorization.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  /**
   * Injects auth and router services for role-based route protection.
   *
   * @param authService - Provides the current user and role
   * @param router - Used to redirect on missing user or insufficient role
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Allows navigation when the user's role matches `route.data.roles`.
   *
   * @param route - Route snapshot; reads `data.roles` as {@link UserRole}[]
   * @returns `true` when no roles are required or the user has a matching role
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as UserRole[];

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
