import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "../../shared/interfaces/movie.interface";

@Pipe({
  name: 'movieImage'
})
export class MovieImagePipe implements PipeTransform {
  transform(movie: Movie): string {
    if (!movie.id && !movie.poster_path){
      return 'assets/no-image.png'
    }

    if (movie.poster_path){
      const baseUrl = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
      return `${baseUrl}${movie.poster_path}`;
    }
    return ""
  }
}
