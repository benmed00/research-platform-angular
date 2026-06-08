import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models/user.model';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);

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
    expect(guard.canActivate(route)).toBeTrue();
  });

  it('should redirect to login when user is missing', () => {
    authService.getCurrentUser.and.returnValue(null);
    const route = { data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE] } } as never;

    expect(guard.canActivate(route)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to unauthorized when role does not match', () => {
    authService.getCurrentUser.and.returnValue({
      role: UserRole.BOTANISTE
    } as never);
    const route = { data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE] } } as never;

    expect(guard.canActivate(route)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });

  it('should allow access when user has a required role', () => {
    authService.getCurrentUser.and.returnValue({
      role: UserRole.DIRECTEUR_ADMIN_FINANCIER
    } as never);
    const route = {
      data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
    } as never;

    expect(guard.canActivate(route)).toBeTrue();
  });
});
