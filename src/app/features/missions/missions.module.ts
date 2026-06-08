import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsListComponent } from './components/missions-list/missions-list.component';

@NgModule({
  declarations: [MissionsListComponent],
  imports: [CommonModule, RouterModule, SharedModule, MissionsRoutingModule]
})
export class MissionsModule {}
