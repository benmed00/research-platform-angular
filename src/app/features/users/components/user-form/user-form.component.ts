import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';
import { USER_ROLE_LABELS } from '../../../../shared/display-formatters';
import { ApiService } from '../../../../core/services/api.service';
import { Permission, User, UserRole } from '../../../../models/user.model';

/**
 * Create/edit form for platform users.
 */
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class UserFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  userForm: FormGroup;
  loading = false;
  saving = false;
  error = '';
  isEditMode = false;
  userId: string | null = null;
  readonly roleOptions = Object.entries(USER_ROLE_LABELS).map(([value, label]) => ({
    value: value as UserRole,
    label
  }));

  /**
   * Builds the reactive user form with validation rules.
   */
  constructor() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      role: [UserRole.BOTANISTE, Validators.required],
      isActive: [true]
    });
  }

  /**
   * Loads an existing user when editing.
   *
   * @returns Nothing.
   */
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = Boolean(this.userId);

    if (this.isEditMode && this.userId) {
      this.loadUser(this.userId);
    }
  }

  /**
   * Fetches a user by id for edit mode.
   *
   * @param id - User identifier
   * @returns Nothing.
   */
  private loadUser(id: string): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.apiService.get<User>(`/users/${id}`).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive
        });
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Utilisateur introuvable';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Persists the form to the API and returns to the users list.
   *
   * @returns Nothing.
   */
  onSubmit(): void {
    if (!this.userForm.valid) {
      return;
    }

    this.saving = true;
    this.error = '';
    this.cdr.markForCheck();

    const payload = {
      ...this.userForm.value,
      permissions: [Permission.READ, Permission.WRITE]
    };

    const request$ =
      this.isEditMode && this.userId
        ? this.apiService.put<User>(`/users/${this.userId}`, payload)
        : this.apiService.post<User>('/users', payload);

    request$.subscribe({
      next: () => {
        void this.router.navigate(['/users']);
      },
      error: () => {
        this.error = 'Enregistrement impossible. Vérifiez les données saisies.';
        this.saving = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Returns to the users list without saving.
   *
   * @returns Nothing.
   */
  onCancel(): void {
    void this.router.navigate(['/users']);
  }
}
