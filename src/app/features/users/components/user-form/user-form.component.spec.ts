import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await configureStandaloneComponentTest(UserFormComponent);
    fixture = TestBed.createComponent(UserFormComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
