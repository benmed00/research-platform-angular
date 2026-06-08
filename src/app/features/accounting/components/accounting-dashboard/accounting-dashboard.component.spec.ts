import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { AccountingModule } from '../../accounting.module';
import { AccountingDashboardComponent } from './accounting-dashboard.component';

describe('AccountingDashboardComponent', () => {
  let fixture: ComponentFixture<AccountingDashboardComponent>;

  beforeEach(async () => {
    await configureFeatureModuleTest(AccountingModule);
    fixture = TestBed.createComponent(AccountingDashboardComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
