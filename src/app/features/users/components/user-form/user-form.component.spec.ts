import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
  configureStandaloneComponentTest,
  createMockUser,
  spyActivatedRoute,
  spyRouter
} from '../../../../../testing/test-helpers';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  async function setup(routeId: string | null = null) {
    router = spyRouter();
    await configureStandaloneComponentTest(UserFormComponent, [
      { provide: Router, useValue: router },
      { provide: ActivatedRoute, useValue: spyActivatedRoute(null, routeId) }
    ]);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UserFormComponent);
    fixture.detectChanges();
  }

  afterEach(() => {
    httpMock?.verify();
  });

  it('should create in new-user mode', async () => {
    await setup();
    expect(fixture.componentInstance.isEditMode).toBe(false);
  });

  it('should create a user on submit', async () => {
    await setup();
    const component = fixture.componentInstance;
    component.userForm.setValue({
      email: 'new@research.local',
      firstName: 'Nouveau',
      lastName: 'User',
      role: createMockUser().role,
      isActive: true
    });

    component.onSubmit();

    const request = httpMock.expectOne('/api/users');
    expect(request.request.method).toBe('POST');
    request.flush(createMockUser({ email: 'new@research.local' }));
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should load an existing user in edit mode', async () => {
    await setup('2');
    const user = createMockUser({ id: '2' });
    httpMock.expectOne('/api/users/2').flush(user);
    fixture.detectChanges();
    expect(fixture.componentInstance.userForm.value.email).toBe(user.email);
  });

  it('should cancel navigation back to the users list', async () => {
    await setup();
    fixture.componentInstance.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });
});
