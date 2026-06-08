import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRole } from '../../../models/user.model';

/** Dashboard summary tile rendered by the shared stat-card component. */
export interface DashboardStat {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: { value: number; isPositive: boolean };
}

/**
 * Role-aware dashboard displaying summary statistics for the logged-in user.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: DashboardStat[] = [];
  loading = false;

  /**
   * Injects auth and API services for dashboard data.
   *
   * @param authService - Provides the current user for personalized titles
   * @param apiService - Loads dashboard statistics from the API
   */
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  /**
   * Initializes the dashboard with the current user and loads stats.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  /**
   * Fetches dashboard statistics from `/dashboard/stats`.
   *
   * @returns Nothing.
   */
  loadDashboardData(): void {
    this.loading = true;
    this.apiService.get<DashboardStat[]>('/dashboard/stats').subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: () => {
        this.stats = [];
        this.loading = false;
      }
    });
  }

  /**
   * Returns a role-specific dashboard title for the current user.
   *
   * @returns Localized dashboard heading
   */
  getDashboardTitle(): string {
    if (!this.currentUser) return 'Tableau de bord';

    const roleTitles: Record<UserRole, string> = {
      [UserRole.DIRECTEUR_SCIENTIFIQUE]: 'Tableau de bord - Direction Scientifique',
      [UserRole.DIRECTEUR_ADMIN_FINANCIER]: 'Tableau de bord - Direction Administrative',
      [UserRole.BOTANISTE]: 'Tableau de bord - Botanique',
      [UserRole.ZOOLOGISTE_TERRESTRE]: 'Tableau de bord - Zoologie Terrestre',
      [UserRole.BIOLOGISTE_MARIN]: 'Tableau de bord - Biologie Marine',
      [UserRole.HYDROBIOLOGISTE]: 'Tableau de bord - Hydrobiologie',
      [UserRole.GEOLOGUE]: 'Tableau de bord - Géologie',
      [UserRole.CLIMATOLOGUE]: 'Tableau de bord - Climatologie',
      [UserRole.DATA_SCIENTIST_SIG]: 'Tableau de bord - SIG & Données',
      [UserRole.INGENIEUR_PLATEFORMES]: 'Tableau de bord - Plateformes',
      [UserRole.TECHNICIEN_LABORATOIRE]: 'Tableau de bord - Laboratoire',
      [UserRole.TECHNICIEN_TERRAIN]: 'Tableau de bord - Terrain',
      [UserRole.MARIN_PILOTE]: 'Tableau de bord - Marine',
      [UserRole.LOGISTICIEN]: 'Tableau de bord - Logistique',
      [UserRole.COMMUNICATION_EDITION]: 'Tableau de bord - Communication'
    };

    return roleTitles[this.currentUser.role] || 'Tableau de bord';
  }
}
