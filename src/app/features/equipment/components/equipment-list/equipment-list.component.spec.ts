import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockEquipment } from '../../../../../testing/mock-api.fixtures';
import { EquipmentModule } from '../../equipment.module';
import { EquipmentListComponent } from './equipment-list.component';

describe('EquipmentListComponent', () => {
  let component: EquipmentListComponent;
  let fixture: ComponentFixture<EquipmentListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(EquipmentModule);
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

    expect(component.loading).toBeFalse();
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
