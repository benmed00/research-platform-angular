import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';

import { GisMapComponent } from './gis-map.component';

describe('GisMapComponent', () => {
  let fixture: ComponentFixture<GisMapComponent>;

  beforeEach(async () => {
    await configureStandaloneComponentTest(GisMapComponent);
    fixture = TestBed.createComponent(GisMapComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
