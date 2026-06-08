import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishingDashboardComponent } from './components/publishing-dashboard/publishing-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PublishingDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishingRoutingModule {}
