import { ChangeDetectorRef, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Login form that authenticates users via AuthService.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class LoginComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  loginForm: FormGroup;
  loading = false;
  error = '';

  /**
   * Builds the reactive login form.
   */
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Submits the login form when valid and navigates to the requested page on success.
   *
   * @returns Nothing.
   */
  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const target = returnUrl && returnUrl.startsWith('/') ? returnUrl : '/dashboard';
        void this.router.navigateByUrl(target);
      },
      error: () => {
        this.error = 'Email ou mot de passe incorrect';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
