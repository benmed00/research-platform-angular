import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { LoginComponent } from './login.component';
import {
  createJwt,
  createMockUser,
  spyAuthService,
  spyRouter
} from '../../../../testing/test-helpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    authService = spyAuthService();
    router = spyRouter();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, SharedModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when the form is invalid', () => {
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should navigate to dashboard on successful login', () => {
    vi.mocked(authService.login).mockReturnValue(
      of({
        token: createJwt(Math.floor(Date.now() / 1000) + 3600),
        expiresIn: 3600,
        user: createMockUser()
      })
    );
    component.loginForm.setValue({ email: 'test@example.com', password: 'secret1' });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an error message on failed login', () => {
    vi.mocked(authService.login).mockReturnValue(throwError(() => new Error('Unauthorized')));
    component.loginForm.setValue({ email: 'test@example.com', password: 'secret1' });

    component.onSubmit();

    expect(component.error).toBe('Email ou mot de passe incorrect');
    expect(component.loading).toBe(false);
  });
});
