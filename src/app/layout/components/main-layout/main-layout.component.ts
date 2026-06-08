import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Authenticated shell layout wrapping sidebar, header, and routed content.
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class MainLayoutComponent {
  sidebarOpen = true;

  /**
   * Toggles sidebar visibility.
   *
   * @returns Nothing.
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
