import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

/**
 * Authenticated shell layout wrapping sidebar, header, and routed content.
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent]
})
export class MainLayoutComponent {
  readonly sidebarOpen = signal(true);

  /**
   * Toggles sidebar visibility.
   *
   * @returns Nothing.
   */
  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }
}
