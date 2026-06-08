import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureStandaloneComponentTest } from '../../../../testing/test-helpers';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await configureStandaloneComponentTest(LoadingSpinnerComponent);
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
