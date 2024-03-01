import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie, Root } from '../../../shared/interfaces/movie.interface';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { FavService } from 'src/app/services/fav.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { FavoriteMovie } from 'src/app/shared/interfaces/fav.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: [ './movie-page.component.css'],
  animations: [
    trigger('slideRightLeft', [
      transition('* => slide-right-enter, * => slide-left-enter', [
        style({ position: 'absolute', width: '100%' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class MoviePageComponent implements OnInit {
  public movie?:Movie;
  id_usuario:number | string | null=localStorage.getItem('id_usuario')
  permises!:Permises
  lista_fav:FavoriteMovie[]=[]
  listaMovie:Movie[]=[]
  isFavorito!:boolean;
  totalMovie!:number;
  indice: number = 0;
  indiceVideos: number=0;
  videos: string[] = ['videoplayback.mp4', 'videoplayback (1).mp4', 'videoplayback (2).mp4', 'videoplayback (3).mp4','videoplayback (4).mp4'];


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
        this.movieService.getMovieByTitle(this.movie!.title).subscribe(peliculas => {
          this.listaMovie = (peliculas as Root).results;
        });
        this.comprobarFavorito();
        return;
      })
  }
  
  mostrarSiguientes() {
    if (this.indice + 5 < this.listaMovie.length) {
      this.indice += 5;
    }
  }
  
  mostrarAnteriores() {
    if (this.indice >= 5) {
      this.indice -= 5;
    }
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

  seeMore(){
    this.movieService.getMovieByTitle(this.movie!.title).subscribe(peliculas => {
      const totalMovies = (peliculas as Root).results.length; // totalMovies es el número total de películas  
      this.totalMovie=totalMovies
      if (this.listaMovie.length < totalMovies) {
        this.movieService.getMovieByTitle(this.movie!.title).subscribe(res => {
          const newMovies = (res as Root).results;
          this.listaMovie = this.listaMovie.concat(newMovies.slice(0, 5));
        });
      }
    });
  }
}

