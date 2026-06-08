import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureFeatureModuleTest, createMockUser } from '../../../../testing/test-helpers';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../models/user.model';
import { LayoutModule } from '../../layout.module';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await configureFeatureModuleTest(LayoutModule);
    TestBed.overrideProvider(AuthService, { useValue: authService });

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return no menu items when user is missing', () => {
    authService.getCurrentUser.and.returnValue(null);
    expect(component.getVisibleMenuItems()).toEqual([]);
  });

  it('should filter menu items by user role', () => {
    authService.getCurrentUser.and.returnValue(createMockUser({ role: UserRole.BOTANISTE }));

    const routes = component.getVisibleMenuItems().map((item) => item.route);
    expect(routes).toContain('/dashboard');
    expect(routes).not.toContain('/users');
    expect(routes).not.toContain('/accounting');
  });
});
