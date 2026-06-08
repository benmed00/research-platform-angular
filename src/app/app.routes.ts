import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './core/pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES)
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.routes').then((m) => m.LAYOUT_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
