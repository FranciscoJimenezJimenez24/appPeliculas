import { Component } from '@angular/core';
import { FavService } from '../../services/fav.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { UserService } from 'src/app/services/user.service';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { FavoriteMovie } from 'src/app/shared/interfaces/fav.interface';

@Component({
  selector: 'app-peliculas-favoritas',
  templateUrl: './peliculas-favoritas.component.html',
  styles: [
  ]
})
export class PeliculasFavoritasComponent {

  constructor(private favService:FavService, private userSerive: UserService) {}

  user!:User
  permises!: Permises;
  peliculas_favoritas:Movie[]=[]
  listaFav: FavoriteMovie[]=[]


  async getFavoritos(){
    this.user=this.favService.currentUser;
    const RESPONSE= await this.favService.getAllFavoritos(this.user.id_usuario).toPromise();
    if (RESPONSE !== undefined) {
      if (RESPONSE.permises !== undefined && RESPONSE.permises !== null) {
        this.permises = RESPONSE.permises;
        if (RESPONSE.ok && RESPONSE){
          this.listaFav=RESPONSE?.data as FavoriteMovie[];
          // this.listaFav.forEach(fav => {
          //   if (fav.id_usuario==this.user.id)
          // });
        }
      }
    }




  }

}
