import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Attaches a Bearer token to outgoing HTTP requests when a JWT is available.
 *
 * @param request - Outgoing HTTP request
 * @param next - Next handler in the interceptor chain
 * @returns Observable of the HTTP event stream
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).getToken();

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
