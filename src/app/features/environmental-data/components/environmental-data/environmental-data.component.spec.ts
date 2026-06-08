import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';
import { EnvironmentalDataComponent } from './environmental-data.component';

describe('EnvironmentalDataComponent', () => {
  let fixture: ComponentFixture<EnvironmentalDataComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(EnvironmentalDataComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EnvironmentalDataComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load environmental summary data', () => {
    httpMock.expectOne('/api/environmental-data/summary').flush({
      waterQualitySites: 18,
      airMonitoringStations: 7,
      climateRecords: 1240,
      geologySamples: 326
    });
    fixture.detectChanges();
    expect(fixture.componentInstance.summary?.waterQualitySites).toBe(18);
  });
});
