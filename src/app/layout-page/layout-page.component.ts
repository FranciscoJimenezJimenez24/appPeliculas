import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado',icon: 'label',url: 'movies/list' },
    { label: 'Buscar',icon: 'search',url: 'movies/search' },
    { label: 'Usuarios', icon: 'supervisor_account', url: '/users' },
    { label: 'Favoritos', icon:'heart',url:'**'}
  ]
}
