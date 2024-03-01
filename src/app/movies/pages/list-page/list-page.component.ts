import { Component, Input, OnInit } from '@angular/core';
import { Movie, Root } from '../../../shared/interfaces/movie.interface';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: [ './list-page.component.css']
})
export class ListPageComponent implements OnInit{
  @Input()
  public listaMovies:Movie[]=[];
  constructor(private movieService:MovieService) {}
  indiceVideos: number=0;
  videos: string[] = ['videoplayback.mp4', 'videoplayback (1).mp4', 'videoplayback (2).mp4', 'videoplayback (3).mp4','videoplayback (4).mp4'];

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      peliculas=>{
        this.listaMovies=(peliculas as Root).results;
      }
    )
  }

  verMasPeliculas(){
    this.movieService.getMovies().subscribe(
      respuesta => {
        // Almacena los resultados en la variable 'listadoMovies' del servicio
        this.listaMovies = [ ...this.listaMovies, ...respuesta.results ];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    )
  }

  changeVideo(direction: number) {
    this.indiceVideos += direction;
    if (this.indiceVideos < 0) {
      this.indiceVideos = this.videos.length - 1;
    } else if (this.indiceVideos >= this.videos.length) {
      this.indiceVideos = 0;
    }
  }
}
