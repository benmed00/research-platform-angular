import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { configureStandaloneComponentTest } from '../../../../../testing/test-helpers';
import { createMockDocuments } from '../../../../../testing/mock-api.fixtures';

import { DocumentsListComponent } from './documents-list.component';

describe('DocumentsListComponent', () => {
  let component: DocumentsListComponent;
  let fixture: ComponentFixture<DocumentsListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await configureStandaloneComponentTest(DocumentsListComponent);
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

    expect(component.loading).toBe(false);
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
