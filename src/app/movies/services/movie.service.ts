import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Movie, Root } from '../interfaces/movie.interface';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { URL_API_FILM, environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient,private sharedService: SharedService) { }

  getMovieByTitle(title:string):Observable<Root | undefined> {
    return this.http.get<Root>(`${URL_API_FILM}/movie?q=${title}&include_adult=false&language=es`,{headers: this.sharedService.headersFilm}).pipe(
      catchError(error => {
        console.error('Error:', error);
        return of(undefined);
      })
    );
  }


}
