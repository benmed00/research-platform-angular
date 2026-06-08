import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models/user.model';
import { spyAuthService, spyRouter } from '../../../testing/test-helpers';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = spyAuthService();
    router = spyRouter();

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(RoleGuard);
  });

  it('should allow access when no roles are required', () => {
    const route = { data: {} } as never;
    expect(guard.canActivate(route)).toBe(true);
  });

  it('should redirect to login when user is missing', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue(null);
    const route = { data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE] } } as never;

    expect(guard.canActivate(route)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to unauthorized when role does not match', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      role: UserRole.BOTANISTE
    } as never);
    const route = { data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE] } } as never;

    expect(guard.canActivate(route)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });

  it('should allow access when user has a required role', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue({
      role: UserRole.DIRECTEUR_ADMIN_FINANCIER
    } as never);
    const route = {
      data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
    } as never;

    expect(guard.canActivate(route)).toBe(true);
  });
});
