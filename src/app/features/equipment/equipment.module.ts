import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';

@NgModule({
  declarations: [EquipmentListComponent],
  imports: [CommonModule, RouterModule, SharedModule, EquipmentRoutingModule]
})
export class EquipmentModule {}
