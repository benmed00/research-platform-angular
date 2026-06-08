import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockBudgets } from '../../../../../testing/mock-api.fixtures';
import { AccountingModule } from '../../accounting.module';
import { AccountingDashboardComponent } from './accounting-dashboard.component';

describe('AccountingDashboardComponent', () => {
  let component: AccountingDashboardComponent;
  let fixture: ComponentFixture<AccountingDashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(AccountingModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AccountingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/accounting/budgets').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load budgets from the API', () => {
    const budgets = createMockBudgets();
    httpMock.expectOne('/api/accounting/budgets').flush(budgets);

    expect(component.loading).toBeFalse();
    expect(component.budgets).toEqual(budgets);
  });

  it('should clear budgets when the API request fails', () => {
    httpMock.expectOne('/api/accounting/budgets').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBeFalse();
    expect(component.budgets).toEqual([]);
  });
});
