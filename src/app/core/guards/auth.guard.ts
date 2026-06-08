import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Blocks unauthenticated navigation and redirects to `/login`.
 *
 * @param _route - Activated route snapshot (unused)
 * @param state - Router state containing the requested URL
 * @returns `true` when authenticated, otherwise a URL tree to `/login`
 * @see AuthService.isAuthenticated
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
