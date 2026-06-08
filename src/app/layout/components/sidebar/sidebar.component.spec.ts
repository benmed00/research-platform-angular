import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  configureStandaloneComponentTest,
  createMockUser,
  spyAuthService
} from '../../../../testing/test-helpers';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../models/user.model';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    authService = spyAuthService();

    await configureStandaloneComponentTest(SidebarComponent);
    TestBed.overrideProvider(AuthService, { useValue: authService });

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return no menu items when user is missing', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue(null);
    component.ngOnInit();
    expect(component.visibleMenuItems).toEqual([]);
  });

  it('should filter menu items by user role', () => {
    vi.mocked(authService.getCurrentUser).mockReturnValue(
      createMockUser({ role: UserRole.BOTANISTE })
    );
    component.ngOnInit();

    const routes = component.visibleMenuItems.map((item) => item.route);
    expect(routes).toContain('/dashboard');
    expect(routes).not.toContain('/users');
    expect(routes).not.toContain('/accounting');
  });
});
