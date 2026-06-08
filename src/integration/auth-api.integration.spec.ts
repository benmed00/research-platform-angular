import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../app/core/services/auth.service';
import { createMockApiLoginResponse, mockApiAccounts } from '../testing/mock-api.fixtures';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('Integration: Auth API contract', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should authenticate using the mock-api login payload shape', () => {
    const credentials = {
      email: mockApiAccounts[0].email,
      password: mockApiAccounts[0].password
    };
    const response = createMockApiLoginResponse(credentials.email);

    authService.login(credentials).subscribe((result) => {
      expect(result.user.email).toBe(credentials.email);
      expect(authService.getToken()).toBe(response.token);
      expect(authService.getCurrentUser()?.role).toBe(response.user.role);
    });

    const request = httpMock.expectOne('/api/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(credentials);
    request.flush(response);
  });

  it('should surface HTTP failures from the login endpoint', () => {
    let receivedError = false;

    authService.login({ email: 'wrong@research.local', password: 'bad' }).subscribe({
      error: () => {
        receivedError = true;
      }
    });

    httpMock
      .expectOne('/api/auth/login')
      .flush(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401, statusText: 'Unauthorized' }
      );

    expect(receivedError).toBeTrue();
    expect(authService.getToken()).toBeNull();
  });
});
