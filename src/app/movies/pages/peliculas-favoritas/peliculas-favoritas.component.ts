import { Component, OnInit } from '@angular/core';
import { FavService } from '../../../services/fav.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
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

  constructor(private favService:FavService, private movieService: MovieService, private snackBar: MatSnackBar,) {}

  permises!: Permises;
  peliculas_favoritas:Movie[]=[]
  listaFav: FavoriteMovie[]=[]
  id_usuario:number | string | null=localStorage.getItem('id_usuario')
  dictFav: { [key: string]: number } = {};

  ngOnInit(){
    this.getFavoritos()
  }



  async getFavoritos(){
    if (this.id_usuario){
      const RESPONSE= await this.favService.getAllFavoritos(this.id_usuario).toPromise();
      console.log(RESPONSE);

      if (RESPONSE !== undefined) {
        if (RESPONSE.ok && RESPONSE){
          this.listaFav=RESPONSE?.data as FavoriteMovie[];
          this.listaFav.forEach(async fav => {
            this.dictFav[fav.id_pelicula]=fav.id_pelicula_favorita
            const pelicula= await this.movieService.getMovieById(fav.id_pelicula).toPromise();
            if (pelicula) {
              this.peliculas_favoritas.push(pelicula);
            }
          });
        }
      }
    }
  }

  async borrarFavorito(id_pelicula:number | string){
    const id_pelicula_favorita=this.dictFav[id_pelicula]
    if (id_pelicula_favorita){
      const RESPONSE  =await this.favService.deleteFavorito(id_pelicula_favorita).toPromise();
      if (RESPONSE && RESPONSE.ok && RESPONSE?.message) {
        this.snackBar.open("Borrada de favoritas", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open('Error al borrar de favoritas', 'Cerrar', { duration: 5000 });
      }
    }
  }


}
