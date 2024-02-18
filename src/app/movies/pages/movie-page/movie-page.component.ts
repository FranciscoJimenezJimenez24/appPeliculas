import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { FavService } from 'src/app/services/fav.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styles: [
  ]
})
export class MoviePageComponent implements OnInit {
  public movie?:Movie;
  token:string | null=localStorage.getItem('token');
  permises!:Permises
  user!:User

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private favService: FavService,
    private userService: UserService,
    private snackBar: MatSnackBar,
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
      this.getUserPorToken();
  }
  async addFavourite(){
    
    if (this.user!=undefined){
      const RESPONSE = await this.favService.addFavorito(this.user.id_usuario, this.movie!.id).toPromise();
      console.log(RESPONSE);
      if (RESPONSE && RESPONSE.ok && RESPONSE?.message) {
        this.snackBar.open("Agregada a favoritas", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open('Error al agregar a favoritas', 'Cerrar', { duration: 5000 });
      }
    }
  }

  async getUserPorToken() {
    if (this.token) {
      const RESPONSE = await this.userService.getUsuarioByToken(this.token).toPromise();
      
      if (RESPONSE !== undefined) {
        if (RESPONSE.permises !== undefined && RESPONSE.permises !== null) {
          this.permises = RESPONSE.permises;
    
          if (RESPONSE.ok) {
            // Se almacena en la propiedad 'userActual' la respuesta de la solicitud
            this.user = RESPONSE.data[0] as User;
            // Se asigna a la propiedad 'currentUser' del servicio los valores del usuario
            // obtenidos a partir del token
            this.userService.user = this.user
          }
        }
      }
    }
  }
  goBack(){
    this.router.navigate(["/movies/list"]);
  }
}

