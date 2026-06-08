import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { EnvironmentalDataModule } from '../../environmental-data.module';
import { EnvironmentalDataComponent } from './environmental-data.component';

describe('EnvironmentalDataComponent', () => {
  let fixture: ComponentFixture<EnvironmentalDataComponent>;

  beforeEach(async () => {
    await configureFeatureModuleTest(EnvironmentalDataModule);
    fixture = TestBed.createComponent(EnvironmentalDataComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
