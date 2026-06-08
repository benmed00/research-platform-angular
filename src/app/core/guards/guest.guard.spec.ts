import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { guestGuard } from './guest.guard';
import { AuthService } from '../services/auth.service';
import { spyActivatedRoute, spyAuthService, spyRouter } from '../../../testing/test-helpers';

describe('guestGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = spyAuthService();
    router = spyRouter();
    vi.mocked(router.parseUrl).mockImplementation((url: string) => ({ urlTree: url }) as never);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: spyActivatedRoute() }
      ]
    });
  });

  function runGuard() {
    return TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never));
  }

  it('should allow guests to access login', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);
    expect(runGuard()).toBe(true);
  });

  it('should redirect authenticated users to the dashboard', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    runGuard();
    expect(router.parseUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should honor returnUrl for authenticated users', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: spyActivatedRoute('/missions') }
      ]
    });
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    TestBed.runInInjectionContext(() => guestGuard({} as never, {} as never));
    expect(router.parseUrl).toHaveBeenCalledWith('/missions');
  });
});
