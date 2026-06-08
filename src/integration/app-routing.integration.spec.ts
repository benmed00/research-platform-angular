import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from '../app/core/guards/auth.guard';
import { RoleGuard } from '../app/core/guards/role.guard';
import { AuthService } from '../app/core/services/auth.service';
import { UserRole } from '../app/models/user.model';
import { createMockUser } from '../testing/test-helpers';

describe('Integration: App routing guards', () => {
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getCurrentUser']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: class LoginStubComponent {} },
          {
            path: 'dashboard',
            component: class DashboardStubComponent {},
            canActivate: [AuthGuard]
          },
          {
            path: 'users',
            component: class UsersStubComponent {},
            canActivate: [AuthGuard, RoleGuard],
            data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
          },
          { path: 'unauthorized', component: class UnauthorizedStubComponent {} }
        ])
      ],
      providers: [AuthGuard, RoleGuard, { provide: AuthService, useValue: authService }]
    });

    router = TestBed.inject(Router);
  });

  it('should redirect unauthenticated users to login', fakeAsync(() => {
    authService.isAuthenticated.and.returnValue(false);
    router.navigateByUrl('/dashboard');
    tick();
    expect(router.url).toBe('/login?returnUrl=%2Fdashboard');
  }));

  it('should allow authenticated users to reach dashboard', fakeAsync(() => {
    authService.isAuthenticated.and.returnValue(true);
    router.navigateByUrl('/dashboard');
    tick();
    expect(router.url).toBe('/dashboard');
  }));

  it('should block users without required roles', fakeAsync(() => {
    authService.isAuthenticated.and.returnValue(true);
    authService.getCurrentUser.and.returnValue(createMockUser({ role: UserRole.BOTANISTE }));

    router.navigateByUrl('/users');
    tick();
    expect(router.url).toBe('/unauthorized');
  }));

  it('should allow users with required roles', fakeAsync(() => {
    authService.isAuthenticated.and.returnValue(true);
    authService.getCurrentUser.and.returnValue(
      createMockUser({ role: UserRole.DIRECTEUR_ADMIN_FINANCIER })
    );

    router.navigateByUrl('/users');
    tick();
    expect(router.url).toBe('/users');
  }));
});
