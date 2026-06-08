import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureSharedComponentTest } from '../../../../testing/test-helpers';
import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await configureSharedComponentTest(StatCardComponent);
    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    component.title = 'Espèces';
    component.value = 42;
    component.icon = 'eco';
    component.color = '#27ae60';
    component.trend = { value: 5, isPositive: true };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input properties', () => {
    expect(component.title).toBe('Espèces');
    expect(component.value).toBe(42);
    expect(component.trend?.isPositive).toBeTrue();
  });
});
