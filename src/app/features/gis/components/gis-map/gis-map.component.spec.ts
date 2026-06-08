import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockMapLayers } from '../../../../../testing/mock-api.fixtures';
import { GisModule } from '../../gis.module';
import { GisMapComponent } from './gis-map.component';

describe('GisMapComponent', () => {
  let component: GisMapComponent;
  let fixture: ComponentFixture<GisMapComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(GisModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(GisMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/gis/layers').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load map layers from the API', () => {
    const layers = createMockMapLayers();
    httpMock.expectOne('/api/gis/layers').flush(layers);

    expect(component.loading).toBeFalse();
    expect(component.layers).toEqual(layers);
  });

  it('should clear layers when the API request fails', () => {
    httpMock.expectOne('/api/gis/layers').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBeFalse();
    expect(component.layers).toEqual([]);
  });
});
