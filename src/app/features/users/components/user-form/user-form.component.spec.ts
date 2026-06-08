import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { UsersModule } from '../../users.module';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await configureFeatureModuleTest(UsersModule);
    fixture = TestBed.createComponent(UserFormComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
