import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockPublications } from '../../../../../testing/mock-api.fixtures';
import { PublishingModule } from '../../publishing.module';
import { PublishingDashboardComponent } from './publishing-dashboard.component';

describe('PublishingDashboardComponent', () => {
  let component: PublishingDashboardComponent;
  let fixture: ComponentFixture<PublishingDashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(PublishingModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PublishingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/publishing/publications').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load publications from the API', () => {
    const publications = createMockPublications();
    httpMock.expectOne('/api/publishing/publications').flush(publications);

    expect(component.loading).toBeFalse();
    expect(component.publications).toEqual(publications);
  });

  it('should clear publications when the API request fails', () => {
    httpMock.expectOne('/api/publishing/publications').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBeFalse();
    expect(component.publications).toEqual([]);
  });
});
