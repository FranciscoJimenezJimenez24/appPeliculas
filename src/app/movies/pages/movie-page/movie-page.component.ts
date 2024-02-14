import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styles: [
  ]
})
export class MoviePageComponent implements OnInit{
  public movie?:Movie;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ){
  }

  ngOnInit():void{
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.movieService.getMovieById(id))
      )
      .subscribe(pelicula=>{
        if (!pelicula) return this.router.navigate(['/movies/list']);
        this.movie=pelicula;
        return;
      })
  }

  goBack(){
    this.router.navigate(['/movies/list'])
  }
}
