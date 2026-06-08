import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { spyAuthService, spyRouter } from '../../../testing/test-helpers';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = spyAuthService();
    router = spyRouter();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  function runGuard(state: { url: string }) {
    return TestBed.runInInjectionContext(() => authGuard({} as never, state as never));
  }

  it('should allow access when authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);

    expect(runGuard({ url: '/dashboard' })).toBe(true);
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('should redirect to login when not authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);

    runGuard({ url: '/users' });

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/users' }
    });
  });
});
