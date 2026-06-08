import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EnvironmentalDataRoutingModule } from './environmental-data-routing.module';
import { EnvironmentalDataComponent } from './components/environmental-data/environmental-data.component';

@NgModule({
  declarations: [EnvironmentalDataComponent],
  imports: [CommonModule, RouterModule, SharedModule, EnvironmentalDataRoutingModule]
})
export class EnvironmentalDataModule {}
