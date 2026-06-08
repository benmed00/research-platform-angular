import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Centered Material progress spinner for loading states.
 *
 * @remarks Place inside feature templates while async data is loading.
 */
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class LoadingSpinnerComponent {}
