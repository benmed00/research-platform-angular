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
    vi.spyOn(component.edit, 'emit').mockReturnValue(undefined);
    component.onEdit(row);
    expect(component.edit.emit).toHaveBeenCalledWith(row);
  });

  it('should emit delete and view events', () => {
    const row = component.data[1];
    vi.spyOn(component.delete, 'emit').mockReturnValue(undefined);
    vi.spyOn(component.view, 'emit').mockReturnValue(undefined);

    component.onDelete(row);
    component.onView(row);

    expect(component.delete.emit).toHaveBeenCalledWith(row);
    expect(component.view.emit).toHaveBeenCalledWith(row);
  });

  it('should trim and lowercase filter values', () => {
    component.applyFilter({ target: { value: '  ALICE  ' } } as unknown as Event);
    expect(component.dataSource.filter).toBe('alice');
  });

  it('should refresh data source on ngOnChanges', () => {
    const nextData = [{ firstName: 'Carol', lastName: 'Bernard', email: 'carol@example.com' }];
    fixture.componentRef.setInput('data', nextData);
    component.ngOnChanges();
    expect(component.dataSource.data).toEqual(nextData);
  });

  it('should wire paginator and sort on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });
});
