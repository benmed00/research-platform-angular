import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';

@NgModule({
  declarations: [DocumentsListComponent],
  imports: [CommonModule, RouterModule, SharedModule, DocumentsRoutingModule]
})
export class DocumentsModule {}
