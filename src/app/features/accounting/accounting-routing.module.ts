import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingDashboardComponent } from './components/accounting-dashboard/accounting-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule {}
