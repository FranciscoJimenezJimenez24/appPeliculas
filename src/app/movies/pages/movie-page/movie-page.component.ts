import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie, Root } from '../../../shared/interfaces/movie.interface';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { FavService } from 'src/app/services/fav.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { FavoriteMovie } from 'src/app/shared/interfaces/fav.interface';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: [ './movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  public movie?:Movie;
  id_usuario:number | string | null=localStorage.getItem('id_usuario')
  permises!:Permises
  lista_fav:FavoriteMovie[]=[]
  listaMovie:Movie[]=[]
  isFavorito!:boolean;
  list:number[]=[3,7,12,16]


  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private favService: FavService,
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
        this.movieService.getMovieByTitle(this.movie!.title).subscribe(res =>{
          this.listaMovie=(res as Root).results
        })
        this.comprobarFavorito();
        return;
      })


  }

  async favorito(){
    if (this.id_usuario) {
      if (this.isFavorito){
        const RESPONSE= await this.favService.getAllFavoritos(this.id_usuario).toPromise();
        if (RESPONSE && RESPONSE.ok) {
          this.lista_fav=RESPONSE.data;
          for (const fav of this.lista_fav) {
            if (fav.id_pelicula == this.movie!.id && fav.id_usuario == this.id_usuario) {
              const RESPONSE2 = await this.favService.deleteFavorito(fav.id_pelicula_favorita).toPromise();
              if (RESPONSE2 && RESPONSE2.ok && RESPONSE2?.message) {
                this.isFavorito=false;
                this.snackBar.open("Borrada de favoritas", 'Cerrar', { duration: 5000 });
                break; // Salir del bucle una vez que se haya borrado de favoritas
              } else {
                this.snackBar.open('Error al borrar de favoritas', 'Cerrar', { duration: 5000 });
              }
            }
          }
        }
      }else{
        const RESPONSE = await this.favService.addFavorito(this.id_usuario, this.movie!.id).toPromise();
        console.log(RESPONSE);
        if (RESPONSE && RESPONSE.ok && RESPONSE?.message) {
          this.isFavorito=true;
          this.snackBar.open("Agregada a favoritas", 'Cerrar', { duration: 5000 });
        } else {
          this.snackBar.open('Error al agregar a favoritas', 'Cerrar', { duration: 5000 });
        }
      }
    }
  }

  async comprobarFavorito(){
    const RESPONSE= await this.favService.getAllFavoritos(this.id_usuario).toPromise();
    if (RESPONSE && RESPONSE.ok) {
      this.lista_fav=RESPONSE.data;
      for (const fav of this.lista_fav) {
        if (fav.id_pelicula == this.movie!.id && fav.id_usuario == this.id_usuario) {
          this.isFavorito=true
          break;
        }else{
          this.isFavorito=false
        }
      }
    }


  }
  goBack(){
    this.router.navigate(["/movies/list"]);
  }
}

