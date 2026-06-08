import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Permission, UserRole } from '../../models/user.model';
import { createJwt, createMockUser } from '../../../testing/test-helpers';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when no token is stored', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return true for a non-expired token', () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    localStorage.setItem('token', createJwt(exp));
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for an expired token', () => {
    const exp = Math.floor(Date.now() / 1000) - 3600;
    localStorage.setItem('token', createJwt(exp));
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return false for an invalid token', () => {
    localStorage.setItem('token', 'not-a-valid-jwt');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return false when token has no expiration claim', () => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub: 'user' }));
    localStorage.setItem('token', `${header}.${payload}.signature`);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return false for hasPermission when no user is loaded', () => {
    expect(service.hasPermission(Permission.READ)).toBeFalse();
  });

  it('should return false for hasRole when no user is loaded', () => {
    expect(service.hasRole(UserRole.BOTANISTE)).toBeFalse();
  });

  it('should emit current user changes through currentUser$', () => {
    const response = {
      token: createJwt(Math.floor(Date.now() / 1000) + 3600),
      expiresIn: 3600,
      user: createMockUser({ email: 'stream@example.com' })
    };
    let emittedEmail: string | undefined;

    service.currentUser$.subscribe((user) => {
      if (user) {
        emittedEmail = user.email;
      }
    });

    service.login({ email: 'stream@example.com', password: 'secret' }).subscribe();
    httpMock.expectOne('/api/auth/login').flush(response);

    expect(emittedEmail).toBe('stream@example.com');
    expect(service.getCurrentUser()?.email).toBe('stream@example.com');
  });

  it('should persist token and user on login', () => {
    const credentials = { email: 'test@example.com', password: 'secret' };
    const response = {
      token: createJwt(Math.floor(Date.now() / 1000) + 3600),
      expiresIn: 3600,
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.BOTANISTE,
        permissions: [Permission.READ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    service.login(credentials).subscribe((res) => {
      expect(res.token).toBe(response.token);
      expect(service.getToken()).toBe(response.token);
      expect(service.getCurrentUser()).toEqual(response.user);
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(response);
  });

  it('should clear storage on logout', () => {
    localStorage.setItem('token', 'token');
    localStorage.setItem('user', '{}');
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should check role and permission after login', () => {
    const credentials = { email: 'admin@example.com', password: 'secret' };
    const response = {
      token: createJwt(Math.floor(Date.now() / 1000) + 3600),
      expiresIn: 3600,
      user: {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: UserRole.DIRECTEUR_SCIENTIFIQUE,
        permissions: [Permission.ADMIN, Permission.READ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    service.login(credentials).subscribe();
    httpMock.expectOne('/api/auth/login').flush(response);

    expect(service.hasRole(UserRole.DIRECTEUR_SCIENTIFIQUE)).toBeTrue();
    expect(service.hasRole(UserRole.BOTANISTE)).toBeFalse();
    expect(service.hasPermission(Permission.ADMIN)).toBeTrue();
    expect(service.hasPermission(Permission.DELETE)).toBeFalse();
  });
});

describe('AuthService storage bootstrap', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should restore user from localStorage on init', () => {
    const user = createMockUser({ email: 'stored@example.com' });
    localStorage.setItem('user', JSON.stringify(user));

    const service = TestBed.inject(AuthService);
    expect(service.getCurrentUser()?.email).toBe(user.email);
    expect(service.getCurrentUser()?.role).toBe(user.role);
  });

  it('should clear storage when stored user JSON is invalid', () => {
    localStorage.setItem('user', 'not-json');
    localStorage.setItem('token', 'token');

    const service = TestBed.inject(AuthService);
    expect(service.getCurrentUser()).toBeNull();
    expect(service.getToken()).toBeNull();
  });
});
