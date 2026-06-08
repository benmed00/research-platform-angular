import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../models/user.model';
import { configureFeatureModuleTest, createMockUser } from '../../../../testing/test-helpers';
import { createMockDashboardStats } from '../../../../testing/mock-api.fixtures';
import { DashboardModule } from '../../dashboard.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'getToken']);
    authService.getCurrentUser.and.returnValue(null);
    authService.getToken.and.returnValue(null);

    await configureFeatureModuleTest(DashboardModule);
    TestBed.overrideProvider(AuthService, { useValue: authService });
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/dashboard/stats').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load dashboard stats from the API', () => {
    const stats = createMockDashboardStats();
    httpMock.expectOne('/api/dashboard/stats').flush(stats);

    expect(component.loading).toBeFalse();
    expect(component.stats).toEqual(stats);
  });

  it('should clear stats when the API request fails', () => {
    httpMock.expectOne('/api/dashboard/stats').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBeFalse();
    expect(component.stats).toEqual([]);
  });

  it('should return default title when no user is loaded', () => {
    httpMock.expectOne('/api/dashboard/stats').flush([]);
    expect(component.getDashboardTitle()).toBe('Tableau de bord');
  });

  it('should return role-specific title when user is loaded', () => {
    httpMock.expectOne('/api/dashboard/stats').flush([]);
    authService.getCurrentUser.and.returnValue(
      createMockUser({ role: UserRole.DIRECTEUR_SCIENTIFIQUE })
    );
    component.currentUser = authService.getCurrentUser();

    expect(component.getDashboardTitle()).toBe('Tableau de bord - Direction Scientifique');
  });

  it('should fallback to default title for unmapped roles', () => {
    httpMock.expectOne('/api/dashboard/stats').flush([]);
    component.currentUser = createMockUser({ role: 'UNKNOWN' as UserRole });
    expect(component.getDashboardTitle()).toBe('Tableau de bord');
  });
});
