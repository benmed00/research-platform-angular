import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { PublishingModule } from '../../publishing.module';
import { PublishingDashboardComponent } from './publishing-dashboard.component';

describe('PublishingDashboardComponent', () => {
  let fixture: ComponentFixture<PublishingDashboardComponent>;

  beforeEach(async () => {
    await configureFeatureModuleTest(PublishingModule);
    fixture = TestBed.createComponent(PublishingDashboardComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
