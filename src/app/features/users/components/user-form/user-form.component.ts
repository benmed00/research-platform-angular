import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/shared-imports';

/**
 * Create/edit form for platform users.
 *
 * @remarks Implementation pending — placeholder component for the users feature module.
 */
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SHARED_IMPORTS]
})
export class UserFormComponent {
  // User form implementation
}
