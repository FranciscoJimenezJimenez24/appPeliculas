import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { LayoutPageComponent } from '../layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { MovieImagePipe } from './pipe/movie-image.pipe';


@NgModule({
  declarations: [
    MoviePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    CardComponent,
    MovieImagePipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class MoviesModule { }
