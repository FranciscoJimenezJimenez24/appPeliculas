import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MoviePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class MoviesModule { }
