import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie.interface';

@Component({
  selector: 'movies-movie-card-tiny',
  templateUrl: './card-tiny.component.html',
  styleUrls: ['./card-tiny.component.css']
})
export class CardTinyComponent {
  @Input()
  public movie!:Movie

  ngOnInit(){
    if (!this.movie) throw new Error('Movie property is required.')
  }
}
