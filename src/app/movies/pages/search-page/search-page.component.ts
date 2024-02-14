import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormControl } from '@angular/forms';
import { Movie, Root } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  peliculas:Movie[]=[];

  constructor(private movieService:MovieService){}

  public searchMovie(){
    const value:string=this.searchInput.value || ''
    
    this.movieService.getMovieByTitle(value).subscribe(
      peliculas =>{
        console.log(peliculas)
        if (peliculas==undefined) return;
        this.peliculas=(peliculas as Root).results;
      }
    )


  }
}
