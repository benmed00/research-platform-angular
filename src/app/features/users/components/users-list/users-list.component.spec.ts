import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { configureStandaloneComponentTest, spyRouter } from '../../../../../testing/test-helpers';
import { createMockApiUsers } from '../../../../../testing/mock-api.fixtures';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    router = spyRouter();
    await configureStandaloneComponentTest(UsersListComponent, [
      { provide: Router, useValue: router }
    ]);
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

  it('should navigate to create and edit routes', () => {
    httpMock.expectOne('/api/users').flush([]);
    component.createUser();
    expect(router.navigate).toHaveBeenCalledWith(['/users/new']);

    component.onEdit({ id: '42' });
    expect(router.navigate).toHaveBeenCalledWith(['/users', '42', 'edit']);
  });

  it('should delete a user after confirmation', () => {
    httpMock.expectOne('/api/users').flush([{ id: '42' }]);
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    component.onDelete({ id: '42' });
    const deleteRequest = httpMock.expectOne('/api/users/42');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush({ success: true });
    httpMock.expectOne('/api/users').flush([]);

    vi.unstubAllGlobals();
  });
});
