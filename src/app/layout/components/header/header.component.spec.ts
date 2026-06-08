import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { configureFeatureModuleTest, createMockUser } from '../../../../testing/test-helpers';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutModule } from '../../layout.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'logout'], {
      currentUser$: { subscribe: () => ({ unsubscribe: () => undefined }) }
    });
    authService.getCurrentUser.and.returnValue(createMockUser());
    router = jasmine.createSpyObj('Router', ['navigate']);

    await configureFeatureModuleTest(LayoutModule);
    TestBed.overrideProvider(AuthService, { useValue: authService });
    TestBed.overrideProvider(Router, { useValue: router });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sidebar toggle events', () => {
    spyOn(component.toggleSidebar, 'emit');
    component.onToggleSidebar();
    expect(component.toggleSidebar.emit).toHaveBeenCalled();
  });

  it('should logout and navigate to login', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
