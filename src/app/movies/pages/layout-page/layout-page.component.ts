import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado',icon: 'label',url: './list' },
    { label: 'Buscar',icon: 'search',url: './search' },
    { label: 'Usuarios', icon: 'user', url: '../../auth' },
    { label: 'Favoritos', icon:'heart',url:'**'}
  ]
}
