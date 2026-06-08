import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockEnvironmentalReadings } from '../../../../../testing/mock-api.fixtures';
import { EnvironmentalDataModule } from '../../environmental-data.module';
import { EnvironmentalDataComponent } from './environmental-data.component';

describe('EnvironmentalDataComponent', () => {
  let component: EnvironmentalDataComponent;
  let fixture: ComponentFixture<EnvironmentalDataComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(EnvironmentalDataModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EnvironmentalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/environmental-data/readings').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load readings from the API', () => {
    const readings = createMockEnvironmentalReadings();
    httpMock.expectOne('/api/environmental-data/readings').flush(readings);

    expect(component.loading).toBeFalse();
    expect(component.readings).toEqual(readings);
  });

  it('should clear readings when the API request fails', () => {
    httpMock.expectOne('/api/environmental-data/readings').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBeFalse();
    expect(component.readings).toEqual([]);
  });
});
