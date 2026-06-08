import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [MainLayoutComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, SharedModule, LayoutRoutingModule],
  exports: [MainLayoutComponent]
})
export class LayoutModule {}
