import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';

import { PublishingDashboardComponent } from './publishing-dashboard.component';

describe('PublishingDashboardComponent', () => {
  let fixture: ComponentFixture<PublishingDashboardComponent>;

  beforeEach(async () => {
    await configureStandaloneComponentTest(PublishingDashboardComponent);
    fixture = TestBed.createComponent(PublishingDashboardComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
