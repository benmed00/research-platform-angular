import { Routes } from '@angular/router';
import { roleGuard } from '../core/guards/role.guard';
import { UserRole } from '../models/user.model';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES)
      },
      {
        path: 'users',
        loadChildren: () => import('../features/users/users.routes').then((m) => m.USERS_ROUTES),
        canActivate: [roleGuard],
        data: { roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER] }
      },
      {
        path: 'hr',
        loadChildren: () => import('../features/hr/hr.routes').then((m) => m.HR_ROUTES)
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('../features/accounting/accounting.routes').then((m) => m.ACCOUNTING_ROUTES),
        canActivate: [roleGuard],
        data: { roles: [UserRole.DIRECTEUR_ADMIN_FINANCIER, UserRole.LOGISTICIEN] }
      },
      {
        path: 'equipment',
        loadChildren: () =>
          import('../features/equipment/equipment.routes').then((m) => m.EQUIPMENT_ROUTES)
      },
      {
        path: 'missions',
        loadChildren: () =>
          import('../features/missions/missions.routes').then((m) => m.MISSIONS_ROUTES)
      },
      {
        path: 'species',
        loadChildren: () =>
          import('../features/species/species.routes').then((m) => m.SPECIES_ROUTES)
      },
      {
        path: 'environmental-data',
        loadChildren: () =>
          import('../features/environmental-data/environmental-data.routes').then(
            (m) => m.ENVIRONMENTAL_DATA_ROUTES
          )
      },
      {
        path: 'gis',
        loadChildren: () => import('../features/gis/gis.routes').then((m) => m.GIS_ROUTES)
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('../features/documents/documents.routes').then((m) => m.DOCUMENTS_ROUTES)
      },
      {
        path: 'publishing',
        loadChildren: () =>
          import('../features/publishing/publishing.routes').then((m) => m.PUBLISHING_ROUTES)
      }
    ]
  }
];
