import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MaterialModule } from '../material/material.module';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
  ]
})
export class UsersModule { }
