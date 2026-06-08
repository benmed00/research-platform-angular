import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { spyAuthService, spyRouter } from '../../../testing/test-helpers';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = spyAuthService();
    router = spyRouter();

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access when authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    const state = { url: '/dashboard' } as never;

    expect(guard.canActivate({} as never, state)).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login when not authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);
    const state = { url: '/users' } as never;

    expect(guard.canActivate({} as never, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/users' }
    });
  });
});
