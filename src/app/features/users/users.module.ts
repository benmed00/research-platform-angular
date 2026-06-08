import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [UsersListComponent, UserFormComponent],
  imports: [CommonModule, RouterModule, SharedModule, UsersRoutingModule]
})
export class UsersModule {}
