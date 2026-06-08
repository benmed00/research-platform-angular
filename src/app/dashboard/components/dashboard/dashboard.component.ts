import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRole } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Mock data - replace with actual API calls
    this.stats = [
      {
        title: 'Espèces cataloguées',
        value: '1,234',
        icon: 'eco',
        color: '#27ae60',
        trend: { value: 12, isPositive: true }
      },
      {
        title: 'Missions actives',
        value: '8',
        icon: 'explore',
        color: '#3498db',
        trend: { value: 3, isPositive: true }
      },
      {
        title: 'Budget consommé',
        value: '65%',
        icon: 'account_balance',
        color: '#e67e22',
        trend: { value: 5, isPositive: false }
      },
      {
        title: 'Équipements actifs',
        value: '42',
        icon: 'precision_manufacturing',
        color: '#9b59b6',
        trend: { value: 2, isPositive: true }
      }
    ];
  }

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
