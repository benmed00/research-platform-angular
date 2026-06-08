import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';
import { createMockMissions } from '../../../../../testing/mock-api.fixtures';

import { MissionsListComponent } from './missions-list.component';

describe('MissionsListComponent', () => {
  let component: MissionsListComponent;
  let fixture: ComponentFixture<MissionsListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(MissionsListComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    httpMock.expectOne('/api/missions').flush([]);
    expect(component).toBeTruthy();
  });

  it('should load missions from the API', () => {
    const missions = createMockMissions();
    httpMock.expectOne('/api/missions').flush(missions);

    expect(component.loading).toBe(false);
    expect(component.missions).toEqual(missions);
  });

  it('should clear missions when the API request fails', () => {
    httpMock.expectOne('/api/missions').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.loading).toBe(false);
    expect(component.missions).toEqual([]);
  });
});
