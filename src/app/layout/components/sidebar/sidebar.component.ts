import { Component, Input } from '@angular/core';
import { UserRole } from '../../../models/user.model';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: UserRole[];
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
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

  constructor(private authService: AuthService) {}

  getVisibleMenuItems(): MenuItem[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    return this.menuItems.filter((item) => {
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.includes(user.role);
    });
  }
}
