import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';

import { EnvironmentalDataComponent } from './environmental-data.component';

describe('EnvironmentalDataComponent', () => {
  let fixture: ComponentFixture<EnvironmentalDataComponent>;

  beforeEach(async () => {
    await configureStandaloneComponentTest(EnvironmentalDataComponent);
    fixture = TestBed.createComponent(EnvironmentalDataComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
