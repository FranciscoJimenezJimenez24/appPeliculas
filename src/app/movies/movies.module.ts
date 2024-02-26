import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { LayoutPageComponent } from '../layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { MovieImagePipe } from './pipe/movie-image.pipe';
import { PeliculasFavoritasComponent } from './pages/peliculas-favoritas/peliculas-favoritas.component';
import { PuntitosPipe } from './pipe/puntitos';
import { CardTinyComponent } from './components/card-tiny/card-tiny.component';


@NgModule({
  declarations: [
    MoviePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    CardComponent,
    MovieImagePipe,
    PeliculasFavoritasComponent,
    PuntitosPipe,
    CardTinyComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule

  ]
})
export class MoviesModule { }
