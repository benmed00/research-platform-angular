import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Login form that authenticates users via AuthService.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  /**
   * Injects the reactive form builder, auth service, and router.
   *
   * @param fb - Builds the reactive login form
   * @param authService - Performs credential authentication
   * @param router - Navigates to dashboard on success
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Submits the login form when valid and navigates to the dashboard on success.
   *
   * @returns Nothing.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (_err) => {
          this.error = 'Email ou mot de passe incorrect';
          this.loading = false;
        }
      });
    }
  }
}
