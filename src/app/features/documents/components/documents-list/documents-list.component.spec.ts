import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureFeatureModuleTest } from '../../../../../testing/test-helpers';
import { createMockDocuments } from '../../../../../testing/mock-api.fixtures';
import { DocumentsModule } from '../../documents.module';
import { DocumentsListComponent } from './documents-list.component';

describe('DocumentsListComponent', () => {
  let component: DocumentsListComponent;
  let fixture: ComponentFixture<DocumentsListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureFeatureModuleTest(DocumentsModule);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load documents from the API', () => {
    const documents = createMockDocuments();
    httpMock.expectOne('/api/documents').flush(documents);

    expect(component.loading).toBeFalse();
    expect(component.documents).toEqual(documents);
  });

  it('should clear documents when the API request fails', () => {
    httpMock.expectOne('/api/documents').flush('Error', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(component.documents).toEqual([]);
  });
});
