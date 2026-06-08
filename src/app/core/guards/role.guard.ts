import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models/user.model';

/**
 * Enforces route-level role requirements declared in `route.data.roles`.
 *
 * @param route - Activated route snapshot with optional `data.roles`
 * @returns `true` when allowed, otherwise a URL tree to `/login` or `/unauthorized`
 * @see AuthService.getCurrentUser
 * @remarks UI guard only; backend must enforce authorization.
 */
export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as UserRole[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const user = authService.getCurrentUser();
  if (!user) {
    return router.createUrlTree(['/login']);
  }

  if (!requiredRoles.includes(user.role)) {
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};
