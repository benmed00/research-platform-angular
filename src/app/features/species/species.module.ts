import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesListComponent } from './components/species-list/species-list.component';

@NgModule({
  declarations: [SpeciesListComponent],
  imports: [CommonModule, RouterModule, SharedModule, SpeciesRoutingModule]
})
export class SpeciesModule {}
