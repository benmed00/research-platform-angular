import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { DataTableValueFormatter } from '../../../../shared/components/data-table/data-table.component';
import { formatActiveStatus, formatUserRole } from '../../../../shared/display-formatters';
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
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
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
  valueFormatters: Record<string, DataTableValueFormatter> = {
    role: (row) => formatUserRole((row as User).role),
    status: (row) => formatActiveStatus((row as User).isActive)
  };

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
   * Navigates to the create-user form.
   *
   * @returns Nothing.
   */
  createUser(): void {
    void this.router.navigate(['/users/new']);
  }

  /**
   * Navigates to the edit form for the selected user.
   *
   * @param user - Selected user row
   * @returns Nothing.
   */
  onEdit(user: object): void {
    const selected = user as User;
    void this.router.navigate(['/users', selected.id, 'edit']);
  }

  /**
   * Deletes the selected user after confirmation.
   *
   * @param user - Selected user row
   * @returns Nothing.
   */
  onDelete(user: object): void {
    const selected = user as User;
    if (!confirm(`Supprimer l'utilisateur ${selected.firstName} ${selected.lastName} ?`)) {
      return;
    }

    this.apiService.delete(`/users/${selected.id}`).subscribe({
      next: () => this.loadUsers(),
      error: () => {
        alert('Impossible de supprimer cet utilisateur.');
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Opens the edit form for read-only inspection.
   *
   * @param user - Selected user row
   * @returns Nothing.
   */
  onView(user: object): void {
    this.onEdit(user);
  }
}
