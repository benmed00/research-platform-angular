import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { spyAuthService } from '../../../testing/test-helpers';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    authService = spyAuthService();

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiService,
        { provide: AuthService, useValue: authService },
        provideHttpClient(withXhr(), withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET without auth header when no token is present', () => {
    vi.mocked(authService.getToken).mockReturnValue(null);

    service.get('/users').subscribe((response) => {
      expect(response).toEqual([{ id: '1' }]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([{ id: '1' }]);
  });

  it('should attach bearer token and query params on GET', () => {
    vi.mocked(authService.getToken).mockReturnValue('test-token');

    service.get('/users', { active: true, page: 2 }).subscribe();

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${environment.apiUrl}/users` &&
        request.params.get('active') === 'true' &&
        request.params.get('page') === '2'
    );
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush([]);
  });

  it('should POST JSON payloads', () => {
    vi.mocked(authService.getToken).mockReturnValue(null);
    const payload = { name: 'Mission Alpha' };

    service.post('/missions', payload).subscribe((response) => {
      expect(response).toEqual({ id: '42' });
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/missions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({ id: '42' });
  });

  it('should PUT JSON payloads', () => {
    vi.mocked(authService.getToken).mockReturnValue('test-token');
    const payload = { name: 'Updated' };

    service.put('/missions/1', payload).subscribe((response) => {
      expect(response).toEqual({ id: '1' });
    });

    const putReq = httpMock.expectOne(`${environment.apiUrl}/missions/1`);
    expect(putReq.request.method).toBe('PUT');
    expect(putReq.request.body).toEqual(payload);
    putReq.flush({ id: '1' });
  });

  it('should DELETE resources', () => {
    vi.mocked(authService.getToken).mockReturnValue('test-token');

    service.delete('/missions/1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const deleteReq = httpMock.expectOne(`${environment.apiUrl}/missions/1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);
  });

  it('should upload multipart files with optional fields', () => {
    vi.mocked(authService.getToken).mockReturnValue('test-token');
    const file = new File(['content'], 'report.pdf', { type: 'application/pdf' });

    service.uploadFile('/documents', file, { category: 'report' }).subscribe((response) => {
      expect(response).toEqual({ id: 'doc-1' });
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/documents`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(req.request.headers.get('Content-Type')).toBeNull();
    req.flush({ id: 'doc-1' });
  });
});
