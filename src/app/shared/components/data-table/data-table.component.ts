import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  AfterViewInit,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

/** Column-specific formatter used by {@link DataTableComponent}. */
export type DataTableValueFormatter = (row: object, column: string) => string;

/**
 * Reusable Material table with filtering, pagination, sorting, and optional row actions.
 *
 * @example
 * ```html
 * <app-data-table
 *   [data]="users"
 *   [columns]="columnLabels"
 *   [displayedColumns]="cols"
 *   (edit)="onEdit($event)" />
 * ```
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class DataTableComponent implements OnChanges, AfterViewInit {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() columns: Record<string, string> = {};
  @Input() data: object[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showActions: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() valueFormatters: Record<string, DataTableValueFormatter> = {};

  @Output() edit = new EventEmitter<object>();
  @Output() delete = new EventEmitter<object>();
  @Output() view = new EventEmitter<object>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<object>();

  /**
   * Column keys to render, including an actions column when enabled.
   *
   * @returns Visible column identifiers for the Material table
   */
  get visibleColumns(): string[] {
    return this.showActions ? [...this.displayedColumns, 'actions'] : this.displayedColumns;
  }

  /**
   * Resolves a human-readable label for a column key.
   *
   * @param column - Column key from `displayedColumns`
   * @returns Label from `columns` map, or the key itself as fallback
   */
  getColumnLabel(column: string): string {
    return this.columns[column] || column;
  }

  /**
   * Resolves the display value for a table cell.
   *
   * @param row - Table row object
   * @param column - Column key
   * @returns Formatted cell value
   */
  getCellValue(row: object, column: string): string {
    const formatter = this.valueFormatters[column];
    if (formatter) {
      return formatter(row, column);
    }

    const value = (row as Record<string, unknown>)[column];
    if (value === null || value === undefined) {
      return '';
    }

    return String(value);
  }

  /**
   * Syncs input data with the table data source and rebinds paginator/sort when available.
   *
   * @returns Nothing.
   */
  ngOnChanges(): void {
    this.dataSource.data = this.data;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.cdr.markForCheck();
  }

  /**
   * Binds paginator and sort after the view initializes.
   *
   * @returns Nothing.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.markForCheck();
  }

  /**
   * Applies a case-insensitive text filter to the table.
   *
   * @param event - Input event from the filter text field
   * @returns Nothing.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.cdr.markForCheck();
  }

  /**
   * Emits the edit action for a row.
   *
   * @param item - Row data object
   * @returns Nothing.
   */
  onEdit(item: object): void {
    this.edit.emit(item);
  }

  /**
   * Emits the delete action for a row.
   *
   * @param item - Row data object
   * @returns Nothing.
   */
  onDelete(item: object): void {
    this.delete.emit(item);
  }

  /**
   * Emits the view action for a row.
   *
   * @param item - Row data object
   * @returns Nothing.
   */
  onView(item: object): void {
    this.view.emit(item);
  }
}
