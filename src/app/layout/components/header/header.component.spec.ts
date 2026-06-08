import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  configureStandaloneComponentTest,
  createMockUser,
  spyAuthService,
  spyRouter
} from '../../../../testing/test-helpers';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    authService = spyAuthService({ currentUser$: of(createMockUser()) });
    vi.mocked(authService.getCurrentUser).mockReturnValue(createMockUser());
    router = spyRouter();

    await configureStandaloneComponentTest(HeaderComponent);
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
    vi.spyOn(component.toggleSidebar, 'emit').mockReturnValue(undefined);
    component.onToggleSidebar();
    expect(component.toggleSidebar.emit).toHaveBeenCalled();
  });

  it('should logout and navigate to login', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
