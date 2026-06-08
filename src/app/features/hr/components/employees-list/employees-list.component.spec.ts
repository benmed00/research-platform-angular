import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockEmployees } from '../../../../../testing/mock-api.fixtures';
import { HrModule } from '../../hr.module';
import { EmployeesListComponent } from './employees-list.component';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(HrModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load employees from the API', () => {
    const employees = createMockEmployees();
    httpMock.expectOne('/api/employees').flush(employees);

    expect(component.loading).toBe(false);
    expect(component.employees).toEqual(employees);
  });

  it('should clear employees when the API request fails', () => {
    httpMock.expectOne('/api/employees').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.employees).toEqual([]);
  });
});
