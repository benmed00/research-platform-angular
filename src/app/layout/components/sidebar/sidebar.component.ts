import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { UserRole } from '../../../models/user.model';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: UserRole[];
  children?: MenuItem[];
}

/**
 * Navigation sidebar with role-based menu filtering.
 *
 * @remarks Hiding menu items is not sufficient for access control — routes must use RoleGuard.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;

  menuItems: MenuItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Utilisateurs',
      icon: 'people',
      route: '/users',
      roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER]
    },
    {
      label: 'Ressources Humaines',
      icon: 'work',
      route: '/hr'
    },
    {
      label: 'Comptabilité',
      icon: 'account_balance',
      route: '/accounting',
      roles: [UserRole.DIRECTEUR_ADMIN_FINANCIER, UserRole.LOGISTICIEN]
    },
    {
      label: 'Équipements',
      icon: 'precision_manufacturing',
      route: '/equipment'
    },
    {
      label: 'Missions',
      icon: 'explore',
      route: '/missions'
    },
    {
      label: 'Espèces',
      icon: 'eco',
      route: '/species'
    },
    {
      label: 'Données Environnementales',
      icon: 'water_drop',
      route: '/environmental-data'
    },
    {
      label: 'SIG & Cartographie',
      icon: 'map',
      route: '/gis'
    },
    {
      label: 'Documents',
      icon: 'folder',
      route: '/documents'
    },
    {
      label: 'Publications',
      icon: 'menu_book',
      route: '/publishing'
    }
  ];

  /**
   * Injects the auth service for role-based menu filtering.
   *
   * @param authService - Provides the current user for role-based filtering
   */
  constructor(private authService: AuthService) {}

  /**
   * Returns menu items visible to the current user based on role restrictions.
   *
   * @returns Filtered menu items; empty when no user is logged in
   */
  getVisibleMenuItems(): MenuItem[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    return this.menuItems.filter((item) => {
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.includes(user.role);
    });
  }
}
