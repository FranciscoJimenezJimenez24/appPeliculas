import { Component, Input, OnInit } from '@angular/core';
import { Movie, Root } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  @Input()
  public listaMovies:Movie[]=[];
  constructor(private movieService:MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      peliculas=>{
        this.listaMovies=(peliculas as Root).results;
      }
    )
  }
}
