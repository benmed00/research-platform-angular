import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RoleGuard } from '../core/guards/role.guard';
import { UserRole } from '../models/user.model';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../features/users/users.module').then((m) => m.UsersModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
      },
      {
        path: 'hr',
        loadChildren: () => import('../features/hr/hr.module').then((m) => m.HrModule)
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('../features/accounting/accounting.module').then((m) => m.AccountingModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRole.DIRECTEUR_ADMIN_FINANCIER, UserRole.LOGISTICIEN] }
      },
      {
        path: 'equipment',
        loadChildren: () =>
          import('../features/equipment/equipment.module').then((m) => m.EquipmentModule)
      },
      {
        path: 'missions',
        loadChildren: () =>
          import('../features/missions/missions.module').then((m) => m.MissionsModule)
      },
      {
        path: 'species',
        loadChildren: () =>
          import('../features/species/species.module').then((m) => m.SpeciesModule)
      },
      {
        path: 'environmental-data',
        loadChildren: () =>
          import('../features/environmental-data/environmental-data.module').then(
            (m) => m.EnvironmentalDataModule
          )
      },
      {
        path: 'gis',
        loadChildren: () => import('../features/gis/gis.module').then((m) => m.GisModule)
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('../features/documents/documents.module').then((m) => m.DocumentsModule)
      },
      {
        path: 'publishing',
        loadChildren: () =>
          import('../features/publishing/publishing.module').then((m) => m.PublishingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
