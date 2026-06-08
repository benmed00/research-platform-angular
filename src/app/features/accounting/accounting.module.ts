import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingDashboardComponent } from './components/accounting-dashboard/accounting-dashboard.component';

@NgModule({
  declarations: [AccountingDashboardComponent],
  imports: [CommonModule, RouterModule, SharedModule, AccountingRoutingModule]
})
export class AccountingModule {}
