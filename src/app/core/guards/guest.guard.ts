import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Redirects authenticated users away from guest-only routes such as `/login`.
 *
 * @param _route - Activated route snapshot (unused)
 * @returns `true` for guests, otherwise a URL tree to the dashboard or `returnUrl`
 */
export const guestGuard: CanActivateFn = (_route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const route = inject(ActivatedRoute);

  if (!authService.isAuthenticated()) {
    return true;
  }

  const returnUrl = route.snapshot.queryParamMap.get('returnUrl');
  const target = returnUrl && returnUrl.startsWith('/') ? returnUrl : '/dashboard';
  return router.parseUrl(target);
};
