import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse, Permission, UserRole } from '../../models/user.model';
import jwtDecode from 'jwt-decode';
import { environment } from '../../../environments/environment';

interface JwtPayload {
  exp?: number;
}

/**
 * Manages authentication state, JWT persistence, and client-side authorization checks.
 *
 * @remarks Client-side session only; the backend must enforce authorization on every API call.
 * @see AuthGuard
 * @see RoleGuard
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  /** Emits the current user whenever login, logout, or storage hydration completes. */
  public currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Creates the service and restores a persisted user from localStorage when present.
   *
   * @param http - Angular HTTP client for auth API calls
   */
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  /**
   * Authenticates the user and persists the JWT and user profile in localStorage.
   *
   * @param credentials - Login email and password
   * @returns Observable emitting token, user, and expiry on success
   * @throws Propagates HTTP errors from the auth endpoint
   *
   * @example
   * ```typescript
   * authService.login({ email, password }).subscribe(res => {
   *   console.log(res.user.role);
   * });
   * ```
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  /**
   * Clears the stored token and user, and resets the current user stream.
   *
   * @returns Nothing.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  /**
   * Returns the persisted JWT, if any.
   *
   * @returns JWT string or `null` when not logged in
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Returns the in-memory current user snapshot.
   *
   * @returns Current user or `null` when logged out
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Checks whether a non-expired JWT exists in localStorage.
   *
   * @returns `true` when a valid, non-expired token is present
   * @see AuthGuard.canActivate
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return (decoded.exp ?? 0) > currentTime;
    } catch {
      return false;
    }
  }

  /**
   * Checks whether the current user holds a specific permission.
   *
   * @param permission - Permission to verify against the user's granted set
   * @returns `true` when the user is logged in and has the permission
   * @remarks UI helper only; backend must enforce permissions.
   */
  hasPermission(permission: Permission): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.permissions.includes(permission);
  }

  /**
   * Checks whether the current user has a specific role.
   *
   * @param role - Role to compare against the user's assigned role
   * @returns `true` when the user is logged in and matches the role
   * @see RoleGuard.canActivate
   * @remarks UI helper only; backend must enforce roles.
   */
  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.role === role;
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch {
        this.logout();
      }
    }
  }
}
