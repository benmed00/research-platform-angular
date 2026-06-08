import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { UserRole } from '../../../models/user.model';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: UserRole[];
}

/**
 * Navigation sidebar with role-based menu filtering.
 *
 * @remarks Hiding menu items is not sufficient for access control — routes must use roleGuard.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input() isOpen: boolean = true;

  visibleMenuItems: MenuItem[] = [];

  private readonly menuItems: MenuItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Utilisateurs',
      icon: 'people',
      route: '/users',
      roles: [UserRole.DIRECTEUR_SCIENTIFIQUE, UserRole.DIRECTEUR_ADMIN_FINANCIER]
    },
    { label: 'Ressources Humaines', icon: 'work', route: '/hr' },
    {
      label: 'Comptabilité',
      icon: 'account_balance',
      route: '/accounting',
      roles: [UserRole.DIRECTEUR_ADMIN_FINANCIER, UserRole.LOGISTICIEN]
    },
    { label: 'Équipements', icon: 'precision_manufacturing', route: '/equipment' },
    { label: 'Missions', icon: 'explore', route: '/missions' },
    { label: 'Espèces', icon: 'eco', route: '/species' },
    { label: 'Données Environnementales', icon: 'water_drop', route: '/environmental-data' },
    { label: 'SIG & Cartographie', icon: 'map', route: '/gis' },
    { label: 'Documents', icon: 'folder', route: '/documents' },
    { label: 'Publications', icon: 'menu_book', route: '/publishing' }
  ];

  /**
   * Subscribes to auth changes so role-filtered menu items stay in sync.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.refreshVisibleMenuItems();
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.refreshVisibleMenuItems();
      this.cdr.markForCheck();
    });
  }

  /**
   * Recomputes menu items visible to the current user.
   *
   * @returns Nothing.
   */
  private refreshVisibleMenuItems(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.visibleMenuItems = [];
      return;
    }

    this.visibleMenuItems = this.menuItems.filter((item) => {
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      return item.roles.includes(user.role);
    });
  }
}
