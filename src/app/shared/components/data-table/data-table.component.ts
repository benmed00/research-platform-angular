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

  get visibleColumns(): string[] {
    return this.showActions ? [...this.displayedColumns, 'actions'] : this.displayedColumns;
  }

  getColumnLabel(column: string): string {
    return this.columns[column] || column;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(item: object): void {
    this.edit.emit(item);
  }

  onDelete(item: object): void {
    this.delete.emit(item);
  }

  onView(item: object): void {
    this.view.emit(item);
  }
}
