import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentalDataComponent } from './components/environmental-data/environmental-data.component';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentalDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentalDataRoutingModule {}
