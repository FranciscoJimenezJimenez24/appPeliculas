import { Component, OnInit } from '@angular/core';
import { FavService } from '../../../services/fav.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { UserService } from 'src/app/services/user.service';
import { Movie, Root } from 'src/app/shared/interfaces/movie.interface';
import { FavoriteMovie } from 'src/app/shared/interfaces/fav.interface';
import { MovieService } from 'src/app/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-peliculas-favoritas',
  templateUrl: './peliculas-favoritas.component.html',
  styles: [
  ]
})
export class PeliculasFavoritasComponent implements OnInit{

  constructor(private favService:FavService, private userService: UserService, private movieService: MovieService, private snackBar: MatSnackBar,) {}

  user!:User
  permises!: Permises;
  peliculas_favoritas:Movie[]=[]
  listaFav: FavoriteMovie[]=[]
  token:string | null=localStorage.getItem('token')
  id_usuario:number | string | null=localStorage.getItem('id_usuario')
  listaIDmovies: Number[]=[]
  listaIDFav: number[]=[]
  fav!:FavoriteMovie

  ngOnInit(){
    this.getUser()
    this.getFavoritos()
    console.log(this.listaFav)
    console.log(this.listaIDFav)
  }

  async getUser(){
    const RESPONSE= await this.userService.getUsuarioById(this.id_usuario).toPromise();
    if (RESPONSE){
      const users:User[]=RESPONSE.data;
      users.forEach(user=>{
        if (user.id_usuario==this.id_usuario){
          this.user=user;
        }
      });
      this.getFavoritos()
    }
  }

  async getFavoritos(){
    if (this.user){
      console.log(this.user.id_usuario)
      const RESPONSE= await this.favService.getFavoritoByUsuario(this.user.id_usuario).toPromise();
      if (RESPONSE !== undefined) {
        if (RESPONSE.ok && RESPONSE){
          this.listaFav=RESPONSE?.data as FavoriteMovie[];
          this.listaFav.forEach(async fav => {
            console.log(fav)
            this.listaIDmovies.push(fav.id_pelicula);
            this.listaIDFav.push(fav.id_pelicula_favorita!!);
            console.log(fav.id_pelicula_favorita)
            const pelicula= await this.movieService.getMovieById(fav.id_pelicula).toPromise();
            if (pelicula) {
              this.peliculas_favoritas.push(pelicula);
            }
          });
        }
      }
    }

  }

  async borrarFavorito(){

  }


}
