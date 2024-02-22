import { Component, Input } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie.interface';

@Component({
  selector: 'movies-movie-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css'  ]
})
export class CardComponent {
  @Input()
  public movie!:Movie

  ngOnInit(){
    if (!this.movie) throw new Error('Movie property is required.')
  }
}
