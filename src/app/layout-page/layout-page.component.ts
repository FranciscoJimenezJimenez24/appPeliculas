import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  nombre_publico: string | null= localStorage.getItem('nombre_publico');
  id_rol: string | null= localStorage.getItem('id_rol');

  public sidebarItems = [
    { label: 'Listado',icon: 'label',url: './list' },
    { label: 'Buscar',icon: 'search',url: './search' },
    { label: 'Favoritos', icon:'fav',url:'./fav'}
  ]

  public sidebarItemsSuperAdmin = [
    { label: 'Listado',icon: 'label',url: './list' },
    { label: 'Buscar',icon: 'search',url: './search' },
    { label: 'Usuarios', icon: 'supervisor_account', url: '/users' },
    { label: 'Favoritos', icon:'fav',url:'./fav'}
  ]


  constructor(
    private authService:AuthService,
    private router:Router
    ){}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

  get user(): User | undefined{
    return this.authService.currentUser;
  }


}
