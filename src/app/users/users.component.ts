import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../shared/interfaces/user.interface';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Overlay } from '@angular/cdk/overlay';
import { Permises } from '../shared/interfaces/api-response';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  permises!: Permises;


  idUsuarioFilter = new FormControl();
  usuarioFilter = new FormControl();
  nombrePublicoFilter = new FormControl();
  idRolFilter = new FormControl();

  displayTable = false;

  displayedColumns!: string[];
  private filterValues = { id_usuario: '', usuario: '', nombre_publico: '', id_rol: '' };


  constructor(
              public dialog: MatDialog,
              private servicioUsuarios: UserService,
              private overlay: Overlay
              ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    const RESPONSE = await this.servicioUsuarios.getAllUsuarios().toPromise();
    if (RESPONSE !== undefined) {
      if (RESPONSE.permises !== undefined && RESPONSE.permises !== null) {
        this.permises = RESPONSE.permises;
        if (RESPONSE.ok) {
          this.displayedColumns = ['id_usuario', 'usuario', 'nombre_publico', 'id_rol', 'actions'];
          this.servicioUsuarios.users = RESPONSE.data as User[];
          this.dataSource.data = this.servicioUsuarios.users;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.createFilter();
          this.onChanges();
        }
      }
    }
  }

  async addUsuario() {
    const dialogRef = this.dialog.open(AddUserComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.users.push(RESP.data);
        this.dataSource.data = this.servicioUsuarios.users;
        this.getUsuarios();
      }
    }
  }

  async editUsuario(usuario: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: usuario,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.servicioUsuarios.users;
        this.getUsuarios();
      }
    }
  }

  async deleteUsuario(usuario: User) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.servicioUsuarios.users;
        this.getUsuarios();
      }
    }
  }

  createFilter(): (usuario: User, filter: string) => boolean {
    const filterFunction = (usuario: User, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return usuario.id_usuario.toString().indexOf(searchTerms.id_usuario.toLowerCase()) !== -1
            && usuario.usuario.toLowerCase().indexOf(searchTerms.usuario.toLowerCase()) !== -1
            && usuario.nombre_publico.toLowerCase().indexOf(searchTerms.nombre_publico.toLowerCase()) !== -1
            && usuario.id_rol.toString().indexOf(searchTerms.rol.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges(): void {
    this.idUsuarioFilter.valueChanges
        .subscribe(value => {
            this.filterValues.id_usuario = value;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

    this.usuarioFilter.valueChanges
        .subscribe(value => {
            this.filterValues.usuario = value;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

    this.nombrePublicoFilter.valueChanges
        .subscribe(value => {
            this.filterValues.nombre_publico = value;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

    this.idRolFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_rol = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    }
}
