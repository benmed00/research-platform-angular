import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';
import { PublishingDashboardComponent } from './publishing-dashboard.component';

describe('PublishingDashboardComponent', () => {
  let fixture: ComponentFixture<PublishingDashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(PublishingDashboardComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PublishingDashboardComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load publishing summary data', () => {
    httpMock.expectOne('/api/publishing/summary').flush({
      manuscriptsInReview: 5,
      publishedThisYear: 11,
      pendingApprovals: 3,
      openAccessTitles: 8
    });
    fixture.detectChanges();
    expect(fixture.componentInstance.summary?.publishedThisYear).toBe(11);
  });
});
