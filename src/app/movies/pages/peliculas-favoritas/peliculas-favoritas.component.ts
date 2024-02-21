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
  peliculas:Movie[]=[]
  listaFav: FavoriteMovie[]=[]
  token:string | null=localStorage.getItem('token')
  id_usuario:number | string | null=localStorage.getItem('id_usuario')
  id:Number | null=Number(this.id_usuario)
  listaIDmovies: Number[]=[]

  ngOnInit(){
    this.movieService.getMovies().subscribe(movies=>{
      this.peliculas=(movies as Root).results
    })
    this.getUser()
    this.getFavoritos()
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
      const RESPONSE= await this.favService.getAllFavoritos(this.user.id_usuario).toPromise();
      if (RESPONSE !== undefined) {
        if (RESPONSE.ok && RESPONSE){
          this.listaFav=RESPONSE?.data as FavoriteMovie[];

          this.listaFav.forEach(fav => {
            if (this.user.id_usuario==fav.id_usuario){
              this.peliculas.forEach(peli=>{
                if (peli.id=== fav.id_pelicula) {
                  this.listaIDmovies.push(peli.id);
                  this.peliculas_favoritas.push(peli);
                }
              });
            }
          });

        }
      }

    }

  }

  async borrarFavorito(){
    const RESPONSE= await this.favService.getAllFavoritos(this.user.id_usuario).toPromise();
      if (RESPONSE && RESPONSE.ok) {
        this.listaFav=RESPONSE.data;
        for (let fav: number = 0; fav < this.listaFav.length; fav++) {
          if (this.listaFav[fav].id_pelicula == this.listaIDmovies[fav] && this.listaFav[fav].id_usuario == this.user.id_usuario) {
            const RESPONSE2 = await this.favService.deleteFavorito(this.listaFav[fav].id_pelicula_favorita).toPromise();
            if (RESPONSE2 && RESPONSE2.ok && RESPONSE2?.message) {
              this.snackBar.open("Borrada de favoritas", 'Cerrar', { duration: 5000 });
              break; // Salir del bucle una vez que se haya borrado de favoritas
            } else {
              this.snackBar.open('Error al borrar de favoritas', 'Cerrar', { duration: 5000 });
            }
          }
        }
      }
  }


}
