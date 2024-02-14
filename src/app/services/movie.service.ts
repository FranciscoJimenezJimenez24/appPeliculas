import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Movie, Root } from '../shared/interfaces/movie.interface';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { URL_API_FILM, environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient,private sharedService: SharedService) { }

  getMovieByTitle(title:string):Observable<Root | undefined> {
    return this.http.get<Root>(`${URL_API_FILM}search/movie?query=${title}&include_adult=false&language=es`,{headers: this.sharedService.headersFilm}).pipe(
      catchError(error => {
        console.error('Error:', error);
        return of(undefined);
      })
    )
  }

  getMovieById(id:number):Observable<Movie>{
    return this.http.get<Movie>(`${URL_API_FILM}movie/${id}`,{headers: this.sharedService.headersFilm})
  }

  getMovies():Observable<Root>{
    return this.http.get<Root>(`${URL_API_FILM}trending/movie/week`,{headers: this.sharedService.headersFilm})
  }

}
