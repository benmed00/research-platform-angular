import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { ApiService } from '../../../../core/services/api.service';
import { User } from '../../../../models/user.model';

/**
 * Lists platform users fetched from the `/users` API endpoint.
 */
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class UsersListComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  loading = false;
  displayedColumns = ['firstName', 'lastName', 'email', 'role', 'status'];
  columnLabels: Record<string, string> = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    role: 'Rôle',
    status: 'Statut'
  };

  /**
   * Injects the API service for loading user records.
   *
   * @param apiService - Loads user records from the API
   */
  constructor(private apiService: ApiService) {}

  /**
   * Loads users on component init.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Fetches all users from `/users`.
   *
   * @returns Nothing.
   */
  loadUsers(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.apiService.get<User[]>('/users').subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.users = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Handles edit action for a user row (not yet implemented).
   *
   * @param _user - Selected user row
   * @returns Nothing.
   */
  onEdit(_user: object): void {
    // Navigate to edit form
  }

  /**
   * Handles delete action for a user row (not yet implemented).
   *
   * @param _user - Selected user row
   * @returns Nothing.
   */
  onDelete(_user: object): void {
    // Show confirmation dialog and delete
  }

  /**
   * Handles view action for a user row (not yet implemented).
   *
   * @param _user - Selected user row
   * @returns Nothing.
   */
  onView(_user: object): void {
    // Navigate to user details
  }
}
