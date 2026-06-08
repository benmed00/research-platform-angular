import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockApiUsers } from '../../../../../testing/mock-api.fixtures';
import { UsersModule } from '../../users.module';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(UsersModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/users').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load users from the API on init', () => {
    const users = createMockApiUsers();
    const request = httpMock.expectOne('/api/users');
    expect(request.request.method).toBe('GET');
    request.flush(users);

    expect(component.loading).toBe(false);
    expect(component.users).toEqual(users);
  });

  it('should clear users when the API request fails', () => {
    httpMock.expectOne('/api/users').flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBe(false);
    expect(component.users).toEqual([]);
  });

  it('should expose table configuration', () => {
    httpMock.expectOne('/api/users').flush([]);
    expect(component.displayedColumns).toEqual([
      'firstName',
      'lastName',
      'email',
      'role',
      'status'
    ]);
    expect(component.columnLabels['email']).toBe('Email');
  });

  it('should handle table action callbacks', () => {
    httpMock.expectOne('/api/users').flush([]);
    const user = { id: '1' };
    expect(() => component.onEdit(user)).not.toThrow();
    expect(() => component.onDelete(user)).not.toThrow();
    expect(() => component.onView(user)).not.toThrow();
  });
});
