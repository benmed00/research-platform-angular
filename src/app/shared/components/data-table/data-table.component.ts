import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges, AfterViewInit {
  @Input() columns: Record<string, string> = {};
  @Input() data: object[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showActions: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

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
  }

  /**
   * Binds paginator and sort after the view initializes.
   *
   * @returns Nothing.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
