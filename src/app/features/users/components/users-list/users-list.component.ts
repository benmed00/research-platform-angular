import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  displayedColumns = ['firstName', 'lastName', 'email', 'role', 'status', 'actions'];
  columnLabels: Record<string, string> = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    role: 'Rôle',
    status: 'Statut'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    // Mock data - replace with actual API call
    this.users = [];
    this.loading = false;
  }

  onEdit(_user: object): void {
    // Navigate to edit form
  }

  onDelete(_user: object): void {
    // Show confirmation dialog and delete
  }

  onView(_user: object): void {
    // Navigate to user details
  }
}
