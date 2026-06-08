import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthInterceptor } from '../app/core/interceptors/auth.interceptor';
import { ApiService } from '../app/core/services/api.service';
import { AuthService } from '../app/core/services/auth.service';
import {
  createMockApiLoginResponse,
  createMockDashboardStats,
  createMockDocuments,
  createMockEmployees,
  createMockEquipment,
  createMockMissions,
  createMockSpecies
} from '../testing/mock-api.fixtures';

describe('Integration: Protected resource APIs', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        ApiService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should fetch dashboard and module resources after login', () => {
    const loginResponse = createMockApiLoginResponse('admin@research.local', 'resource-token');

    authService.login({ email: 'admin@research.local', password: 'password123' }).subscribe();
    httpMock.expectOne('/api/auth/login').flush(loginResponse);

    const routes = [
      { url: '/api/dashboard/stats', data: createMockDashboardStats() },
      { url: '/api/missions', data: createMockMissions() },
      { url: '/api/species', data: createMockSpecies() },
      { url: '/api/equipment', data: createMockEquipment() },
      { url: '/api/documents', data: createMockDocuments() },
      { url: '/api/employees', data: createMockEmployees() }
    ];

    routes.forEach(({ url, data }) => {
      http.get(url).subscribe((response) => {
        expect(response).toEqual(data);
      });

      const request = httpMock.expectOne(url);
      expect(request.request.headers.get('Authorization')).toBe('Bearer resource-token');
      request.flush(data);
    });
  });
});
