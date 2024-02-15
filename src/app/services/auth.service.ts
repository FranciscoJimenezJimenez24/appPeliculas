import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';
import { User } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl= environment.baseUrl;
  private user?:User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined{
    if (!this.user) return undefined;

    //devuelve una copia
    return structuredClone(this.user)
  }

  login(email:string,password:string):Observable<User | undefined>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((user: User | undefined) => this.user = user),
        tap((user: User | undefined) => localStorage.setItem('token',"sdfgkpasedjrgGDFsdfgdsfg.sfgqeawrgtQAFdfgh"))
      )
  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }
}
