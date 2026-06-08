import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { GisModule } from '../../gis.module';
import { GisMapComponent } from './gis-map.component';

describe('GisMapComponent', () => {
  let fixture: ComponentFixture<GisMapComponent>;

  beforeEach(async () => {
    await configureFeatureModuleTest(GisModule);
    fixture = TestBed.createComponent(GisMapComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
