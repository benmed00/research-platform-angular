import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';
import { createMockEquipment } from '../../../../../testing/mock-api.fixtures';

import { EquipmentListComponent } from './equipment-list.component';

describe('EquipmentListComponent', () => {
  let component: EquipmentListComponent;
  let fixture: ComponentFixture<EquipmentListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(EquipmentListComponent);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load equipment from the API', () => {
    const equipment = createMockEquipment();
    httpMock.expectOne('/api/equipment').flush(equipment);

    expect(component.loading).toBe(false);
    expect(component.equipment).toEqual(equipment);
  });

  it('should clear equipment when the API request fails', () => {
    httpMock.expectOne('/api/equipment').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.equipment).toEqual([]);
  });
});
