import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Page title bar with optional subtitle and Material icon.
 *
 * @example
 * ```html
 * <app-page-header title="Utilisateurs" subtitle="Gestion des comptes" icon="people" />
 * ```
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class PageHeaderComponent {
  /** Primary page heading. */
  @Input() title: string = '';
  /** Optional secondary line below the title. */
  @Input() subtitle?: string;
  /** Material icon name displayed beside the title. */
  @Input() icon?: string;
}
