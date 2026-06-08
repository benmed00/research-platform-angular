import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HrRoutingModule } from './hr-routing.module';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

@NgModule({
  declarations: [EmployeesListComponent],
  imports: [CommonModule, RouterModule, SharedModule, HrRoutingModule]
})
export class HrModule {}
