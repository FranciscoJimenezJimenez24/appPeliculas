import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MaterialModule } from '../material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { PeliculasFavoritasComponent } from '../movies/pages/peliculas-favoritas/peliculas-favoritas.component';
import { MovieImagePipe } from '../movies/pipe/movie-image.pipe';



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
