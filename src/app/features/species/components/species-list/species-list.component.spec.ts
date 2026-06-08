import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockSpecies } from '../../../../../testing/mock-api.fixtures';
import { SpeciesModule } from '../../species.module';
import { SpeciesListComponent } from './species-list.component';

describe('SpeciesListComponent', () => {
  let component: SpeciesListComponent;
  let fixture: ComponentFixture<SpeciesListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(SpeciesModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load species from the API', () => {
    const species = createMockSpecies();
    httpMock.expectOne('/api/species').flush(species);

    expect(component.loading).toBeFalse();
    expect(component.species).toEqual(species);
  });

  it('should clear species when the API request fails', () => {
    httpMock.expectOne('/api/species').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.species).toEqual([]);
  });
});
