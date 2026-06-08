import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table.component';
import { SharedModule } from '../../shared.module';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('displayedColumns', ['firstName', 'lastName', 'email']);
    fixture.componentRef.setInput('columns', {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email'
    });
    fixture.componentRef.setInput('data', [
      { firstName: 'Alice', lastName: 'Martin', email: 'alice@example.com' },
      { firstName: 'Bob', lastName: 'Durand', email: 'bob@example.com' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose displayed columns without actions by default', () => {
    expect(component.visibleColumns).toEqual(['firstName', 'lastName', 'email']);
  });

  it('should append actions column when showActions is true', () => {
    component.showActions = true;
    expect(component.visibleColumns).toEqual(['firstName', 'lastName', 'email', 'actions']);
  });

  it('should resolve column labels from the columns map', () => {
    expect(component.getColumnLabel('firstName')).toBe('Prénom');
    expect(component.getColumnLabel('unknown')).toBe('unknown');
  });

  it('should bind data to the table data source', () => {
    expect(component.dataSource.data).toEqual(component.data);
  });

  it('should emit edit events', () => {
    const row = component.data[0];
    spyOn(component.edit, 'emit');
    component.onEdit(row);
    expect(component.edit.emit).toHaveBeenCalledWith(row);
  });

  it('should filter rows from the search input', () => {
    component.applyFilter({ target: { value: 'alice' } } as unknown as Event);
    expect(component.dataSource.filter).toBe('alice');
  });
});
