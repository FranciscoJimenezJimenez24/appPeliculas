import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/environments/environments';
import { CommonService } from '../shared/common.service';
import { User } from '../shared/interfaces/user.interface';

const ENDPOINT = 'peliculas_favoritas';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  user!: User;
  users: User[] = [];
  currentUser!: User;

  constructor(private http:HttpClient, private commonService: CommonService) { }

  getAllFavoritos(id_usuario: number | null) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  }

  getFavoritoById(id: number | null) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_pelicula_favorita=${id}`, { headers: this.commonService.headers });
  }

  addFavorito(id_usuario: number, id_pelicula:number) {
    const body = JSON.stringify({id_usuario: id_usuario, id_pelicula: id_pelicula});
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteFavorito(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
