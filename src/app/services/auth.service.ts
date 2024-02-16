import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';
import { User } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { URL_API } from 'src/environments/environments';
import { ApiResponse } from '../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?:User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined{
    if (!this.user) return undefined;
    
    //devuelve una copia
    return structuredClone(this.user)
  }

  login(data: any){
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API}/login.php`, body);
  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }

  checkAuthentication():Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false); //no necesitamos operacion asincrona

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${URL_API}/usuario.php`)
      .pipe(
        tap(user=>this.user=user),//tap: efecto secundario para almacenar el usuario
        map(user=>!!user),//map: transformamos la salida, hacemos doble negación, negamos y negamos
                          //Basicamente devolvemos true si hay un usuario
                          //Es lo mismo que poner map ( user => user? true : false)
        catchError(err=>of(false))//y si el backend devuelve error, es false
      )
  }

}
