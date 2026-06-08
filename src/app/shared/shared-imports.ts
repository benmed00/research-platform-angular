import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { MATERIAL_IMPORTS } from './material-imports';

/** Common standalone imports for feature and layout components. */
export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ...MATERIAL_IMPORTS,
  PageHeaderComponent,
  StatCardComponent,
  DataTableComponent,
  LoadingSpinnerComponent
] as const;
