import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';

import { AccountingDashboardComponent } from './accounting-dashboard.component';

describe('AccountingDashboardComponent', () => {
  let fixture: ComponentFixture<AccountingDashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(AccountingDashboardComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AccountingDashboardComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load accounting summary', () => {
    const request = httpMock.expectOne('/api/accounting/summary');
    request.flush({
      budgetTotal: '2 400 000 MAD',
      budgetConsumed: '1 560 000 MAD',
      pendingInvoices: 14,
      approvedGrants: 6
    });
    fixture.detectChanges();
    expect(fixture.componentInstance.summary?.budgetTotal).toBe('2 400 000 MAD');
  });
});
