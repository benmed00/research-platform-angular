import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../app/auth/components/login/login.component';
import { AuthInterceptor } from '../app/core/interceptors/auth.interceptor';
import { ApiService } from '../app/core/services/api.service';
import { AuthService } from '../app/core/services/auth.service';
import { User } from '../app/models/user.model';
import { SharedModule } from '../app/shared/shared.module';
import {
  createMockApiLoginResponse,
  createMockApiUsers,
  mockApiAccounts
} from '../testing/mock-api.fixtures';

describe('Integration: Auth stack (login → token → API)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, SharedModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        AuthService,
        ApiService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should complete login and attach bearer token to subsequent API calls', () => {
    const loginFixture = TestBed.createComponent(LoginComponent);
    const loginComponent = loginFixture.componentInstance;
    spyOn(router, 'navigate');

    const credentials = {
      email: mockApiAccounts[1].email,
      password: mockApiAccounts[1].password
    };
    const loginResponse = createMockApiLoginResponse(credentials.email, 'integration-token');

    loginComponent.loginForm.setValue(credentials);
    loginComponent.onSubmit();

    httpMock.expectOne('/api/auth/login').flush(loginResponse);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(authService.getToken()).toBe('integration-token');

    http.get<User[]>('/api/users').subscribe((users) => {
      expect(users.length).toBe(2);
    });

    const usersRequest = httpMock.expectOne('/api/users');
    expect(usersRequest.request.headers.get('Authorization')).toBe('Bearer integration-token');
    usersRequest.flush(createMockApiUsers());
  });
});
