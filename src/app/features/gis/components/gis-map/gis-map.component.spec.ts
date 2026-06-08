import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';
import { GisMapComponent } from './gis-map.component';

describe('GisMapComponent', () => {
  let fixture: ComponentFixture<GisMapComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(GisMapComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GisMapComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load GIS summary data', () => {
    httpMock.expectOne('/api/gis/summary').flush({
      activeLayers: 12,
      mappedSites: 48,
      satelliteImages: 156,
      fieldTracks: 89
    });
    fixture.detectChanges();
    expect(fixture.componentInstance.summary?.activeLayers).toBe(12);
  });
});
