import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { configureStandaloneComponentTest, spyRouter } from '../../../../testing/test-helpers';
import { UnauthorizedComponent } from './unauthorized.component';

describe('UnauthorizedComponent', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;
  let router: Router;

  beforeEach(async () => {
    router = spyRouter();

    await configureStandaloneComponentTest(UnauthorizedComponent);
    TestBed.overrideProvider(Router, { useValue: router });

    fixture = TestBed.createComponent(UnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to dashboard', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
