import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiService,
        { provide: AuthService, useValue: authService },
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
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
    authService.getToken.and.returnValue(null);

    service.get('/users').subscribe((response) => {
      expect(response).toEqual([{ id: '1' }]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush([{ id: '1' }]);
  });

  it('should attach bearer token and query params on GET', () => {
    authService.getToken.and.returnValue('test-token');

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
    authService.getToken.and.returnValue(null);
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
    authService.getToken.and.returnValue('test-token');
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
    authService.getToken.and.returnValue('test-token');

    service.delete('/missions/1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const deleteReq = httpMock.expectOne(`${environment.apiUrl}/missions/1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);
  });

  it('should upload multipart files with optional fields', () => {
    authService.getToken.and.returnValue('test-token');
    const file = new File(['content'], 'report.pdf', { type: 'application/pdf' });

    service.uploadFile('/documents', file, { category: 'report' }).subscribe((response) => {
      expect(response).toEqual({ id: 'doc-1' });
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/documents`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(req.request.headers.get('Content-Type')).toBeNull();
    req.flush({ id: 'doc-1' });
  });
});
