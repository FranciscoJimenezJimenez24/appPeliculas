import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments.prod';
import { User } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { URL_API } from 'src/environments/environments';
import { ApiResponse } from '../shared/interfaces/api-response';

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

  login(data: any){
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API}/login.php`, body);
  }

  logout(){
    this.user=undefined;
    localStorage.clear();
  }
}
