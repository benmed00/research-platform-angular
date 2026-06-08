import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureStandaloneComponentTest } from '../../../../testing/test-helpers';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await configureStandaloneComponentTest(PageHeaderComponent);
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    component.title = 'Utilisateurs';
    component.subtitle = 'Gestion des comptes';
    component.icon = 'people';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input properties', () => {
    expect(component.title).toBe('Utilisateurs');
    expect(component.subtitle).toBe('Gestion des comptes');
    expect(component.icon).toBe('people');
  });
});
