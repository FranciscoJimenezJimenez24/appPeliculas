import { Component } from '@angular/core';
import { FavService } from '../../../services/fav.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { UserService } from 'src/app/services/user.service';
import { Movie, Root } from 'src/app/shared/interfaces/movie.interface';
import { FavoriteMovie } from 'src/app/shared/interfaces/fav.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-peliculas-favoritas',
  templateUrl: './peliculas-favoritas.component.html',
  styles: [
  ]
})
export class PeliculasFavoritasComponent {

  constructor(private favService:FavService, private userService: UserService, private movieService: MovieService) {}

  user!:User
  permises!: Permises;
  peliculas_favoritas:Movie[]=[]
  peliculas:Movie[]=[]
  listaFav: FavoriteMovie[]=[]
  token:string | null=localStorage.getItem('token')

  ngOnInit(){
    this.movieService.getMovies().subscribe(movies=>{
      this.peliculas=(movies as Root).results
    })
    this.getUserPorToken()
    this.getFavoritos()
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
            this.getFavoritos()
            // Se asigna a la propiedad 'currentUser' del servicio los valores del usuario
            // obtenidos a partir del token
            this.userService.user = this.user
            
          }
        }
      }
    }
  }


  async getFavoritos(){
    console.log(this.user);
    if (this.user){
      const RESPONSE= await this.favService.getAllFavoritos(this.user.id_usuario).toPromise();
      
      if (RESPONSE !== undefined) {        
        if (RESPONSE.ok && RESPONSE){
          this.listaFav=RESPONSE?.data as FavoriteMovie[];
          
          this.listaFav.forEach(fav => {
            if (this.user.id_usuario==fav.id_usuario){
              this.peliculas.forEach(peli=>{
                if (peli.id=== fav.id_pelicula) {
                  this.peliculas_favoritas.push(peli);
                }
              });
            }
          });
          
        }
      }
      
    }
    
  }

  
}
