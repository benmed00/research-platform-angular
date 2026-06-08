import { Component, Input } from '@angular/core';

/** Trend indicator shown on a {@link StatCardComponent}. */
export interface StatCardTrend {
  value: number;
  isPositive: boolean;
}

/**
 * Dashboard metric card with optional icon, color, and trend indicator.
 *
 * @example
 * ```html
 * <app-stat-card
 *   title="Missions actives"
 *   value="8"
 *   icon="explore"
 *   color="#3498db"
 *   [trend]="{ value: 3, isPositive: true }" />
 * ```
 */
@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  /** Metric label. */
  @Input() title: string = '';
  /** Displayed metric value. */
  @Input() value: string | number = '';
  /** Material icon name. */
  @Input() icon?: string;
  /** Accent color for the icon background. */
  @Input() color: string = '#3498db';
  /** Optional period-over-period trend. */
  @Input() trend?: StatCardTrend;
}
