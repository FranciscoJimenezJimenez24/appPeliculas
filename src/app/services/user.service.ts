import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environments';
import { ApiResponse } from '../shared/interfaces/api-response.interface';

const ENDPOINT = 'usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!:User
  users!: User[];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }



  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUsuario(usuario: User) {
    const body = JSON.stringify(usuario);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, {headers: this.commonService.headers });
  }

  editUsuario(usuario: User, route?: string) {
    const body = JSON.stringify(usuario);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteUsuario(usuario: User) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${usuario.id_usuario}`, { headers: this.commonService.headers });
  }

  getUsuarioById(id_usuario: string | number | null) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  }

  getUsuarioByToken(token:string){
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?token_sesion=${token}`, { headers: this.commonService.headers });
  }

  // getUsuarioByToken(token_sesion: string | null) {
  //   const body = JSON.stringify({ token_sesion: token_sesion });
  //   let encodedToken = ""; // Inicializar la variable
  //   if (token_sesion !== null) {
  //     encodedToken = encodeURIComponent(token_sesion); // Codificar el token solo si no es nulo
  //   }
  //   console.log(token_sesion);
  //   console.log(body);
  //   return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?token_sesion=${encodedToken}`, body, { headers: this.commonService.headers });
  // }

}
