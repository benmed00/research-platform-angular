import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { authGuard } from '../app/core/guards/auth.guard';
import { roleGuard } from '../app/core/guards/role.guard';
import { AuthService } from '../app/core/services/auth.service';
import { UserRole } from '../app/models/user.model';
import { createMockUser, spyAuthService } from '../testing/test-helpers';

describe('Integration: App routing guards', () => {
  beforeEach(() => {
    vi.useFakeTimers({ advanceTimeDelta: 1, shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    authService = spyAuthService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: class LoginStubComponent {} },
          {
            path: 'dashboard',
            component: class DashboardStubComponent {},
            canActivate: [authGuard]
          },
          {
            path: 'users',
            component: class UsersStubComponent {},
            canActivate: [authGuard, roleGuard],
            data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
          },
          { path: 'unauthorized', component: class UnauthorizedStubComponent {} }
        ])
      ],
      providers: [{ provide: AuthService, useValue: authService }]
    });

    router = TestBed.inject(Router);
  });

  it('should redirect unauthenticated users to login', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);
    router.navigateByUrl('/dashboard');
    await vi.advanceTimersByTimeAsync(0);
    expect(router.url).toBe('/login?returnUrl=%2Fdashboard');
  });

  it('should allow authenticated users to reach dashboard', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    router.navigateByUrl('/dashboard');
    await vi.advanceTimersByTimeAsync(0);
    expect(router.url).toBe('/dashboard');
  });

  it('should block users without required roles', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    vi.mocked(authService.getCurrentUser).mockReturnValue(
      createMockUser({ role: UserRole.BOTANISTE })
    );

    router.navigateByUrl('/users');
    await vi.advanceTimersByTimeAsync(0);
    expect(router.url).toBe('/unauthorized');
  });

  it('should allow users with required roles', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    vi.mocked(authService.getCurrentUser).mockReturnValue(
      createMockUser({ role: UserRole.DIRECTEUR_ADMIN_FINANCIER })
    );

    router.navigateByUrl('/users');
    await vi.advanceTimersByTimeAsync(0);
    expect(router.url).toBe('/users');
  });
});
