import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { roleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models/user.model';
import { spyAuthService, spyRouter } from '../../../testing/test-helpers';

describe('roleGuard', () => {
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

  function runGuard(route: { data: Record<string, unknown> }) {
    return TestBed.runInInjectionContext(() => roleGuard(route as never, {} as never));
  }

  it('should allow access when no roles are required', () => {
    expect(runGuard({ data: {} })).toBe(true);
  });

  it('should redirect to login when user is missing', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue(null);

    runGuard({ data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE] } });

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to unauthorized when role does not match', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      role: UserRole.BOTANISTE
    } as never);

    runGuard({ data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE] } });

    expect(router.createUrlTree).toHaveBeenCalledWith(['/unauthorized']);
  });

  it('should allow access when user has a required role', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      role: UserRole.DIRECTEUR_ADMIN_FINANCIER
    } as never);

    expect(
      runGuard({
        data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
      })
    ).toBe(true);
  });
});
