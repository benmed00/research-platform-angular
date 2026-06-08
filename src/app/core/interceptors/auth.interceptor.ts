import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Attaches a Bearer token to outgoing HTTP requests when a JWT is available.
 *
 * @see ApiService — also attaches auth headers for wrapped calls
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Injects the auth service for JWT retrieval.
   *
   * @param authService - Provides the JWT to attach to requests
   */
  constructor(private authService: AuthService) {}

  /**
   * Clones the request with an `Authorization` header when a token exists.
   *
   * @param request - Outgoing HTTP request
   * @param next - Next handler in the interceptor chain
   * @returns Observable of HTTP events for the (possibly modified) request
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
