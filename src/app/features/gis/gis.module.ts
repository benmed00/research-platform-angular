import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GisRoutingModule } from './gis-routing.module';
import { GisMapComponent } from './components/gis-map/gis-map.component';

@NgModule({
  declarations: [GisMapComponent],
  imports: [CommonModule, RouterModule, SharedModule, GisRoutingModule]
})
export class GisModule {}
