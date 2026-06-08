import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PublishingRoutingModule } from './publishing-routing.module';
import { PublishingDashboardComponent } from './components/publishing-dashboard/publishing-dashboard.component';

@NgModule({
  declarations: [PublishingDashboardComponent],
  imports: [CommonModule, RouterModule, SharedModule, PublishingRoutingModule]
})
export class PublishingModule {}
